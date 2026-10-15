import {
  INTRO_BUILD_ORDER,
  prefersReducedMotion,
} from "@/components/intro/intro-seen";

const STEP_MS = 200;
const TAIL_MS = 420;
const SECTION_STEP_MS = 260;
const SECTION_CAP = 5;

const seen = new Set<string>();

const REVEAL =
  "opacity 420ms cubic-bezier(0.23, 1, 0.32, 1), transform 420ms cubic-bezier(0.23, 1, 0.32, 1)";

export function pageKey(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/"))
    return pathname.slice(0, -1);
  return pathname || "/";
}

export function hasPageMounted(pathname: string) {
  return seen.has(pageKey(pathname));
}

export function markPageMounted(pathname: string) {
  seen.add(pageKey(pathname));
}

function reveal(node: HTMLElement) {
  node.style.transition = REVEAL;
  window.requestAnimationFrame(() => {
    node.style.opacity = "1";
    node.style.transform = "none";
  });
}

function hide(node: HTMLElement) {
  node.style.opacity = "0";
  node.style.transform = "translateY(10px)";
}

export function clearPageMotion(root?: ParentNode) {
  const scope = root ?? document;
  scope.querySelectorAll("[data-build], [data-mount-piece]").forEach((node) => {
    node.removeAttribute("data-built");
    node.removeAttribute("data-mount-piece");
    if (!(node instanceof HTMLElement)) return;
    node.style.opacity = "";
    node.style.transform = "";
    node.style.transition = "";
  });
}

export function playHomeBuild(onDone: () => void, onMissing?: () => void) {
  if (prefersReducedMotion()) {
    onDone();
    return () => undefined;
  }

  let step = 0;
  let tail = 0;
  let waitFrame = 0;
  let intervalId = 0;
  let cancelled = false;
  let started = false;

  const mark = (name: (typeof INTRO_BUILD_ORDER)[number]) => {
    document.querySelectorAll(`[data-build="${name}"]`).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      node.setAttribute("data-built", "");
      reveal(node);
    });
  };

  const begin = () => {
    document.querySelectorAll("[data-build]").forEach((node) => {
      if (!(node instanceof HTMLElement) || node.hasAttribute("data-built"))
        return;
      hide(node);
    });
    window.requestAnimationFrame(() => {
      if (cancelled) return;
      const first = INTRO_BUILD_ORDER[0];
      if (first) mark(first);
      step = 1;
      intervalId = window.setInterval(() => {
        if (cancelled) return;
        const name = INTRO_BUILD_ORDER[step];
        if (!name) {
          window.clearInterval(intervalId);
          tail = window.setTimeout(() => {
            if (!cancelled) onDone();
          }, TAIL_MS);
          return;
        }
        mark(name);
        step += 1;
        if (step >= INTRO_BUILD_ORDER.length) {
          window.clearInterval(intervalId);
          tail = window.setTimeout(() => {
            if (!cancelled) onDone();
          }, TAIL_MS);
        }
      }, STEP_MS);
    });
  };

  const waitForHome = () => {
    if (cancelled) return;
    if (document.querySelector('[data-build="welcome"]')) {
      started = true;
      begin();
      return;
    }
    waitFrame = window.requestAnimationFrame(waitForHome);
  };

  waitForHome();
  const giveUp = window.setTimeout(() => {
    if (cancelled || started) return;
    (onMissing ?? onDone)();
  }, 4000);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(waitFrame);
    window.clearInterval(intervalId);
    window.clearTimeout(giveUp);
    window.clearTimeout(tail);
    clearPageMotion();
  };
}

function groupPieces(pieces: HTMLElement[]) {
  const groups: HTMLElement[][] = [];
  for (const piece of pieces) {
    const group = piece.dataset.mountGroup;
    const last = groups[groups.length - 1];
    if (group && last?.[0]?.dataset.mountGroup === group) {
      last.push(piece);
      continue;
    }
    groups.push([piece]);
  }
  return groups;
}

function sectionPieces(root: HTMLElement) {
  const marked = [...root.querySelectorAll<HTMLElement>("[data-mount]")].filter(
    (node) => !node.closest("[data-mount-when='scroll']"),
  );
  if (marked.length > 0) return marked;

  const container = root.querySelector("main > div");
  const source = container ?? root.querySelector("main");
  if (!(source instanceof HTMLElement)) return [];
  return [...source.children].filter(
    (node): node is HTMLElement =>
      node instanceof HTMLElement && node.tagName !== "SCRIPT",
  );
}

function watchScrollMounts(root: HTMLElement) {
  const sections = [
    ...root.querySelectorAll<HTMLElement>("[data-mount-when='scroll']"),
  ];
  if (sections.length === 0 || prefersReducedMotion()) return () => undefined;

  sections.forEach((section) => hide(section));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        if (!(section instanceof HTMLElement)) return;
        observer.unobserve(section);

        const inner = [
          ...section.querySelectorAll<HTMLElement>("[data-mount]"),
        ];
        inner.forEach((node) => hide(node));
        section.style.transition = REVEAL;
        section.style.opacity = "1";
        section.style.transform = "none";

        if (inner.length === 0) return;

        let step = 1;
        let intervalId = 0;
        const show = (node: HTMLElement) => {
          node.style.transition = REVEAL;
          window.requestAnimationFrame(() => {
            node.style.opacity = "1";
            node.style.transform = "none";
          });
        };
        const first = inner[0];
        if (first) {
          window.requestAnimationFrame(() => show(first));
        }
        if (inner.length === 1) return;
        intervalId = window.setInterval(() => {
          const node = inner[step];
          if (!node) {
            window.clearInterval(intervalId);
            return;
          }
          show(node);
          step += 1;
          if (step >= inner.length) window.clearInterval(intervalId);
        }, SECTION_STEP_MS);
      });
    },
    { rootMargin: "0px 0px 120px 0px", threshold: 0.1 },
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}

export function playSectionBuild(root: HTMLElement, onDone: () => void) {
  if (prefersReducedMotion()) {
    onDone();
    return () => undefined;
  }

  const pieces = sectionPieces(root);
  if (pieces.length === 0) {
    onDone();
    return () => undefined;
  }

  let intervalId = 0;
  let tail = 0;
  let frame = 0;
  let cancelled = false;
  const explicit = [...root.querySelectorAll("[data-mount]")].some(
    (node) => !node.closest("[data-mount-when='scroll']"),
  );
  const paced = explicit ? pieces : pieces.slice(0, SECTION_CAP);
  const rest = explicit ? [] : pieces.slice(SECTION_CAP);
  const stopScroll = watchScrollMounts(root);

  pieces.forEach((node) => {
    node.setAttribute("data-mount-piece", "");
    hide(node);
  });

  const show = (nodes: HTMLElement[]) => {
    nodes.forEach((node) => {
      node.setAttribute("data-built", "");
      reveal(node);
    });
  };

  const finish = () => {
    if (cancelled) return;
    clearPageMotion(root);
    onDone();
  };

  frame = window.requestAnimationFrame(() => {
    if (cancelled) return;
    let step = 1;
    const groups = groupPieces(paced);
    const first = groups[0];
    if (!first) {
      finish();
      return;
    }
    show(groups.length === 1 ? pieces : first);
    if (groups.length === 1) {
      tail = window.setTimeout(finish, 280);
      return;
    }
    intervalId = window.setInterval(() => {
      if (cancelled) return;
      const group = groups[step];
      if (!group) {
        window.clearInterval(intervalId);
        return;
      }
      show(step === groups.length - 1 ? [...group, ...rest] : group);
      step += 1;
      if (step >= groups.length) {
        window.clearInterval(intervalId);
        tail = window.setTimeout(finish, 280);
      }
    }, SECTION_STEP_MS);
  });

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frame);
    window.clearInterval(intervalId);
    window.clearTimeout(tail);
    stopScroll();
    clearPageMotion(root);
  };
}

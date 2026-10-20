"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  LuBriefcase,
  LuCheck,
  LuCoffee,
  LuArrowUpRight,
  LuCopy,
  LuLayoutGrid,
  LuLinkedin,
  LuMail,
  LuRocket,
  LuSend,
} from "react-icons/lu";
import toast from "react-hot-toast";

import { Tooltip } from "@/components/ui/Tooltip";
import { socials } from "@/constants/socials";
import {
  CONTACT_ADDON_MAX,
  CONTACT_COMPANY_MAX,
  contactSubjectIds,
  contactSubjects,
  type ContactSubjectId,
} from "@/constants/contact";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { cn } from "@/libs/cn";

const PELOTAS_TIME_ZONE = "America/Sao_Paulo";

function usePelotasTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZone: PELOTAS_TIME_ZONE,
        }).format(new Date()),
      );
    };

    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

const subjectIcons = {
  project: LuRocket,
  recruiter: LuBriefcase,
  chat: LuCoffee,
} as const;

const emailHref =
  socials.find((item) => item.name === "Email")?.href ?? "mailto:devffzanini@gmail.com";
const linkedinHref =
  socials.find((item) => item.name === "LinkedIn")?.href ??
  "https://www.linkedin.com/in/ffzanini/";

const ctaHref = {
  recruiter: "https://resume.ffzanini.dev",
  chat: linkedinHref,
} as const;

type ContactFields = {
  name: string;
  email: string;
  company: string;
  addon: string;
  message: string;
};

const primaryActionClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary-400 to-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-[background-color,box-shadow] duration-200 hover:from-primary-500 hover:to-primary-700";

const fieldClass =
  "flex h-10 w-full rounded-md border bg-black/5 border-black/20 px-3 py-2 text-base dark:bg-white/5 dark:border-white/20 focus-visible:outline-none focus:border-primary-600";

function isEmail(value: string) {
  const at = value.indexOf("@");
  if (at < 1 || at !== value.lastIndexOf("@")) return false;
  const domain = value.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  return dot > 0 && dot < domain.length - 1 && !value.includes(" ");
}

export function ContactIntentSection() {
  const { translations, location } = useTranslation();
  const copy = translations.contact;
  const intent = copy.intent;
  const [subject, setSubject] = useState<ContactSubjectId>("project");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageCardRef = useRef<HTMLDivElement>(null);
  const selected = intent.subjects[subject];
  const isRecruiter = subject === "recruiter";
  const pelotasTime = usePelotasTime();

  const { register, handleSubmit, formState, reset, setValue, getValues, unregister } =
    useForm<ContactFields>({
      mode: "onChange",
      reValidateMode: "onChange",
      shouldUnregister: true,
      defaultValues: {
        name: "",
        email: "",
        company: "",
        addon: "",
        message: "",
      },
    });

  const enableSubmit = formState.isValid && !isSubmitting;

  let submitLabel = copy.button_text_not_ready;
  if (isSubmitting) {
    submitLabel = copy.button_text_sending;
  } else if (enableSubmit) {
    submitLabel = copy.form.send;
  }

  const chooseSubject = (next: ContactSubjectId) => {
    setSubject(next);
    setValue("addon", "", { shouldValidate: true });
    if (next === "recruiter") {
      setValue("company", "", { shouldValidate: true });
    } else {
      unregister("company");
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messageCardRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const onSubmit = handleSubmit(async ({ name, email, company, addon, message }) => {
    setIsSubmitting(true);
    toast.promise(
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: contactSubjects[subject],
          addon,
          company: subject === "recruiter" ? company : "",
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(copy.error);
          return res.json();
        })
        .then(() => {
          reset();
          setSubject("project");
        })
        .finally(() => {
          setIsSubmitting(false);
        }),
      {
        loading: copy.loading,
        success: copy.success,
        error: copy.error,
      },
    );
  });

  return (
    <section className="mt-8">
      <div className="mb-6 flex justify-center">
        <p className="flex w-full max-w-xs flex-col items-center gap-1 rounded-2xl border border-black/10 bg-black/5 px-4 py-2.5 text-center text-sm dark:border-white/10 dark:bg-white/5 sm:inline-flex sm:w-auto sm:max-w-none sm:flex-row sm:gap-2 sm:rounded-full sm:py-1.5 sm:text-left">
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            <span className="font-semibold">{intent.availability}</span>
          </span>
          <span className="hidden text-black/35 sm:inline dark:text-white/35" aria-hidden>
            ·
          </span>
          <span className="whitespace-nowrap text-black/70 dark:text-white/70">
            {intent.city}
            {pelotasTime ? ` · ${pelotasTime}` : ""}
          </span>
        </p>
      </div>
      <div
        role="radiogroup"
        aria-label={intent.title}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {contactSubjectIds.map((id) => {
          const item = intent.subjects[id];
          const Icon = subjectIcons[id];
          const active = subject === id;

          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => chooseSubject(id)}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border px-4 py-5 text-center transition-[border-color,box-shadow,background-color] duration-200",
                active
                  ? "border-primary-600 bg-primary-600/10 shadow-[0_0_28px] shadow-primary-600/30"
                  : "border-black/10 bg-black/5 hover:border-primary-600/40 dark:border-white/10 dark:bg-white/5",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  active
                    ? "bg-primary-600 text-white"
                    : "bg-black/5 text-black/70 dark:bg-white/10 dark:text-white/70",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={messageCardRef}
        id="envie-uma-mensagem"
        className="mt-4 scroll-mt-28 rounded-2xl border border-black/10 bg-black/5 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mb-8 flex flex-row items-start">
          <div className="mr-4 flex h-12 w-12 min-w-12 items-center justify-center rounded-md bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900">
            <LuMail className="h-6 w-6" aria-hidden />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold">{copy.form.title}</h2>
            <span className="text-xs">{copy.form.sub_title}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
        <aside className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">{selected.panelTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70 lg:min-h-[4.5rem] dark:text-white/70">
              {selected.panelDescription}
            </p>
          </div>
          <ul className="space-y-2.5">
            {selected.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                  <LuCheck className="h-3 w-3" aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {subject === "project" ? (
              <Link href={withLocalePath(location, "/projects")} className={primaryActionClass}>
                <LuLayoutGrid className="h-4 w-4" aria-hidden />
                {selected.cta}
              </Link>
            ) : (
              <a
                href={ctaHref[subject]}
                target="_blank"
                rel="noreferrer"
                className={primaryActionClass}
              >
                {subject === "recruiter" ? (
                  <LuArrowUpRight className="h-4 w-4" aria-hidden />
                ) : (
                  <LuLinkedin className="h-4 w-4" aria-hidden />
                )}
                {selected.cta}
              </a>
            )}
            <a
              href={emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/15 px-4 py-2.5 text-sm font-semibold transition-colors duration-150 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              <LuCopy className="h-4 w-4" aria-hidden />
              {intent.email}
            </a>
          </div>
        </aside>

        <div className="lg:border-l lg:border-black/10 lg:pl-10 dark:lg:border-white/10">
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{copy.form.name}</span>
                <input
                  {...register("name", {
                  required: true,
                  maxLength: 100,
                  validate: (value) => value.trim().length > 0,
                })}
                  autoComplete="name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{copy.form.email}</span>
                <input
                  {...register("email", { required: true, validate: isEmail })}
                  autoComplete="email"
                  inputMode="email"
                  className={fieldClass}
                />
              </label>
            </div>

            <div className={cn("grid grid-cols-1 gap-5", isRecruiter && "sm:grid-cols-2")}>
              {isRecruiter && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">{copy.form.company}</span>
                  <input
                    {...register("company", {
                      required: true,
                      maxLength: CONTACT_COMPANY_MAX,
                      validate: (value) => value.trim().length > 0,
                    })}
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium">{selected.addon}</span>
                <input
                  {...register("addon", {
                    required: true,
                    maxLength: CONTACT_ADDON_MAX,
                    validate: (value) => value.trim().length > 0,
                  })}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">{copy.form.message}</span>
              <textarea
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                  validate: (value) => {
                    const text = value.trim();
                    if (!text) return false;
                    if (subject !== "recruiter") return true;
                    const company = getValues("company").trim();
                    return `Empresa: ${company}\n\n${text}`.length <= 2000;
                  },
                })}
                className={cn(fieldClass, "min-h-32")}
              />
            </label>

            <Tooltip
              className="block w-full"
              text={!enableSubmit && !isSubmitting ? copy.tooltip : ""}
            >
              <button
                disabled={!enableSubmit}
                type="submit"
                className="flex w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-linear-to-r from-primary-400 to-primary-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-[transform,box-shadow,background-color] duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-xl disabled:cursor-not-allowed disabled:grayscale sm:px-8 sm:py-3"
              >
                <LuSend className="mr-2 h-4 w-4" aria-hidden />
                {submitLabel}
              </button>
            </Tooltip>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}

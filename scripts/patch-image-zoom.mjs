import { readFileSync, writeFileSync } from "node:fs";

const file = new URL(
  "../node_modules/react-medium-image-zoom/dist/controlled.js",
  import.meta.url,
);

const source = readFileSync(file, "utf8");
const marker = "for (const axis of ['height', 'left', 'top', 'width'])";

if (source.includes(marker)) {
  process.exit(0);
}

const target = "                : {};\n        let modalContent = null;";
const patch = `                : {};
        for (const axis of ['height', 'left', 'top', 'width']) {
            if (!Number.isFinite(this.styleModalImg[axis])) {
                delete this.styleModalImg[axis];
            }
        }
        let modalContent = null;`;

if (!source.includes(target)) {
  console.error("react-medium-image-zoom patch point not found");
  process.exit(1);
}

writeFileSync(file, source.replace(target, patch));

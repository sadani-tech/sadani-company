import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);
const compat = new FlatCompat({ baseDirectory: currentDirectory });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
];

export default eslintConfig;

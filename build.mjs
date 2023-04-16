/* eslint-env node */
import { build } from "esbuild";
import babel from "esbuild-plugin-babel";

build({
  entryPoints: { baggo: "src/main.ts" },
  outdir: "KoLmafia/scripts",
  bundle: true,
  minifySyntax: true,
  platform: "node",
  target: "rhino1.7.14",
  external: ["kolmafia"],
  plugins: [babel()],
  loader: { ".json": "text" },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

import del from "rollup-plugin-delete";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: ["./src/index.ts"],
  output: [{ file: pkg.module, format: "esm" }],
  plugins: [external(), del({ targets: ["build/*"] }), typescript()],
  external: Object.keys(pkg.peerDependencies || {}),
};

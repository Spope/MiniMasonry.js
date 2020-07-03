import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/minimasonry.js",
  output: [
    {
      file: "build/minimasonry.esm.js",
      format: "es",
      name: "MiniMasonry"
    },
    {
      file: "build/minimasonry.min.js",
      format: "iife",
      name: "MiniMasonry",
      plugins: [uglify()]
    }
  ]
};

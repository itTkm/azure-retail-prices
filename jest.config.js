module.exports = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: {
        /* Ignore the error "is declared, but not used."
        https://huafu.github.io/ts-jest/user/config/diagnostics */
        ignoreCodes: [2322],
      },
    },
  },
  testMatch: ["**/tests/**/*.test.ts"],
};

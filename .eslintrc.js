module.exports = {
  overrides: [
    {
      files: ["src/components/**/*.vue"],
      rules: {
        "vue/multi-word-component-names": 0,
      },
    },
  ],
  extends: ["plugin:vue/base"],
};

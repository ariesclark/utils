require("@ariesclark/eslint-config/eslint-patch");

module.exports = {
	root: true,
	extends: ["@ariesclark/eslint-config"],
	parserOptions: {
		tsconfigRootDir: __dirname
	}
};

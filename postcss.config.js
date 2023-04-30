const purgecss = require("@fullhuman/postcss-purgecss");

const plugins = [];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        purgecss({
            content: [
                "./src/components/**/*.vue",
                "./src/pages/**/*.vue",
                "./src/**/*.vue"
            ],
            // css: [
            //     {
            //         raw: 'body { margin: 0 }'
            //     },
            //     "./src/styles/core/scafholding/scafholding.scss"
            // ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            fontFace: true,
            whitelist: ["html", "body"],
            whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
        })
    );
}

module.exports = { plugins };
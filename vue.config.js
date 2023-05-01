// const CompressionPlugin = require("compression-webpack-plugin");
// const productionGzipExtensions = ['js', 'css']
// const ZopfliPlugin = require("zopfli-webpack-plugin");
// const path = require('path')

module.exports = {
    transpileDependencies: ['node_modules'],
    // pwa: {
    //     name: "workbox",
    //     themeColor: "#fff3e0",
    //     msTileColor: "#fff3e0",
    //     appleMobileWbeAppCapable: "yes",
    //     appleMobileWebAppStatusBarStyle: "#fff3e0",
    //     // workboxPluginMode: "GenerateSW",
    //     workboxPluginMode: 'InjectManifest',
    //     workboxOptions: {
    //         swSrc: "./service-worker.js",
    //         exclude: [/_redirect/, /\.map$/, /_headers/],
    //     },
    //     manifestOptions: {
    //         background_color: "#ffe24a",
    //     }
    // },
    // pluginOptions: {
    //     compression:{
    //         gzip: {
    //             filename: '[file].gz[query]',
    //             algorithm: 'gzip',
    //             include: /\.(js|css|html|svg|json)(\?.*)?$/i,
    //             minRatio: 0.8,
    //         }
    //     }
    // }
    configureWebpack:{
        // output: {
            // clean: true,
            // filename: '[name].bundle.js',
        // },
        // plugins: [new CompressionPlugin({
        //     filename: "[path][base].gz",
        //     // deleteOriginalAssets: true,
        //     algorithm: 'gzip',
        //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //     // include: /.*\.js(\?.*)?$/i,
        // })],

        // module: {
        //     rules: [
        //         {
        //             enforce: 'pre',
        //             test: /.*\.js$/,
        //             include: path.resolve(__dirname, 'src'),
        //             loader: 'string-replace-loader',
        //             options: {
        //                 search: '.js',
        //                 replace: '.js.gz',
        //             }
        //         }
        //     ]
        // },

        plugins: [
            // new ZopfliPlugin({
            //     asset: "[path].gz[query]",
            //     algorithm: "zopfli",
            //     test: /\.(js|html)$/,
            //     threshold: 10240,
            //     minRatio: 0.8
            // })
            // new CompressionPlugin({
            //     filename: '[path][base].br',
            //     algorithm: 'brotliCompress',
            //     test: /\.js$/,
            // })
        ],
        optimization: {
            // namedModules: true,
            // namedChunks: true,
            // removeAvailableModules: true,
            // "sideEffects": false,
            splitChunks: {
                minSize: 10000,
                maxSize: 25000,
            }
        }
    },

    pwa: {
      name: 'nnn',
            workboxPluginMode: 'InjectManifest',
        workboxOptions: {
                swSrc: "./service-worker.js",
                exclude: [/_redirect/, /\.map$/, /_headers/],
            },
    }
}
module.exports = {
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: __dirname + "/dist",
        libraryTarget: 'commonjs2'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
  
            { test: /\.scss?$/, use: [ { loader: 'style-loader' }, { loader: 'css-loader'}, { loader: "sass-loader"} ] },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "commonjs react",
        "react-dom": "ReactDOM"
    }
};
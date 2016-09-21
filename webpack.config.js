module.exports = {
    context: __dirname,
    entry: {
    //  'server': "webpack-dev-server/client?http://localhost:4002",
      'simple-grids.js': "./examples/js/simple-grids.js",
      'fullscreen.js': "./examples/js/fullscreen.js",
    },
    output: {
        path: "examples/build/",
        filename: "[name]",
        publicPath: "/build/",
    //    sourceMapFilename: "[file].map",
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', },
      ]
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    devServer: {
        contentBase: "./examples",
        hot: true,

    },
    cacheDirectory: false

};

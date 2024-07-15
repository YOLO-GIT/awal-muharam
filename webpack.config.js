const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            'three/examples/jsm/loaders/FontLoader': path.resolve(__dirname, 'node_modules/three/examples/jsm/loaders/FontLoader.js'),
            'three/examples/jsm/geometries/TextGeometry': path.resolve(__dirname, 'node_modules/three/examples/jsm/geometries/TextGeometry.js'),
            'three/examples/jsm/controls/OrbitControls': path.resolve(__dirname, 'node_modules/three/examples/jsm/controls/OrbitControls.js'),
        },
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
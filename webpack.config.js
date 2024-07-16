const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/gsap.js', // New entry point
    },
    output: {
        filename: '[name].bundle.js', // This will create index.bundle.js and another.bundle.js
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
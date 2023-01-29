const path = require("path");

module.exports = {

    entry: [
        "./src/anualidad.js",
        "./src/gradiente.js",
        "./src/payback.js",
        "./src/van.js",
        "./src/equilibrio.js",
        "./src/addFlujos.js",
        "./src/seleccion.js",
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
};
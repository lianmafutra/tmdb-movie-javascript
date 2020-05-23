const path = require("path");
 
module.exports = {
    entry: "./src/index.js", //direktori module yang akan di export
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" 
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
 }


// membantu menulis js secara modular maka ada export dan import

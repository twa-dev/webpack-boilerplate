import HTMLWebpackPlugin from "html-webpack-plugin";
import StylelintWebpackPlugin from "stylelint-webpack-plugin";
import EslintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import ngrok from "ngrok";
import ngrokConfig from "./ngrok.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === "development";

const config = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    publicPath: "",
    filename: isDev ? "[name].js" : "[contenthash:6].[name].js",
    assetModuleFilename: "images/[contenthash:6].[ext]",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader].concat([
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: (resourcePath) => {
                  return !resourcePath.includes("node_modules");
                },
              },
            },
          },
        ]),
      },
      {
        test: /\.svg$/,
        use: ["svg-react-loader"].concat(isDev ? [] : ["svgo-loader"]),
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "all",
          name: "vendors",
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new StylelintWebpackPlugin(),
    new EslintWebpackPlugin({
      extensions: ["ts", "tsx"],
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    open: true,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    onListening: async function (devServer) {
      if (ngrokConfig.authToken) {
        const port = devServer.server.address().port;
        await ngrok.connect({
          proto: "http",
          addr: port,
          host_header: "rewrite",
          authtoken: ngrokConfig.authToken,
          subdomain: ngrokConfig.subdomain,
        });
      }
    },
  },
};

if (!isDev) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].js" : "[contenthash:6].[name].css",
    })
  );
}

export default config;

import HTMLWebpackPlugin from "html-webpack-plugin";
import StylelintWebpackPlugin from "stylelint-webpack-plugin";
import EslintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlInlineScriptPlugin from "html-inline-script-webpack-plugin";
import path from "path";
import ngrok from "ngrok";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { readFile } from "fs/promises";
import open from "open";

const require = createRequire(import.meta.url);
const { name } = require("./package.json");
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
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.module.css$/,
        include: /src/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader].concat([
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: "[hash:base64:4]",
              },
            },
          },
          "postcss-loader",
        ]),
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader].concat([
          "css-loader",
        ]),
      },
      {
        test: /\.component.svg$/,
        use: ["svg-react-loader"].concat(isDev ? [] : ["svgo-loader"]),
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf)$/i,
        type: "asset",
      },
      {
        test: /\.svg$/i,
        use: isDev ? [] : ["svgo-loader"],
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
      title: name,
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/telegram-web-apps/],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  devServer: {
    allowedHosts: "all",
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    onListening: async function (devServer) {
      const port = devServer.server.address().port;
      try {
        const ngrokConfig = JSON.parse(
          await readFile(new URL("./ngrok.json", import.meta.url))
        );
        const url = await ngrok.connect({
          host_header: "rewrite",
          proto: "http",
          addr: port,
          ...ngrokConfig,
        });
        await open(url);
      } catch (e) {
        await open(`http://localhost:${port}`);
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

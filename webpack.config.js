module.exports = {
  entry: {
    main: "./src/pages/main.tsx",
    signIn: "./src/pages/sign-in.tsx",
    signUp: "./src/pages/sign-up.tsx"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};

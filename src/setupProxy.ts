import createProxyMiddleware from "http-proxy-middleware";
module.exports = (app) => {
  app.use(
    createProxyMiddleware(["/"], {
      target: "https://www.easyupclass.com",
      changeOrigin: true,
    })
  );
};

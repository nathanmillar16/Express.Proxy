const express = require("express");
const app = express();
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();
const listeningPort = 3999;
const HEADER_BASE_URL = "localhost:3334";

proxy.on("proxyReq", function (proxyReq, req) {
  const SITEURL = `${req.protocol}://${req.hostname}:${listeningPort}`;
  proxyReq.setHeader("x-next-siteurl", SITEURL);
  proxyReq.setHeader("test-with-local-esi", "true");
  proxyReq.setHeader("x-next-realm", "jojomamanbebe");
  proxyReq.setHeader("x-next-territory", "gb");
  proxyReq.setHeader("x-next-language", "en");
});

app.get("/*", function (req, res) {
  proxy.web(req, res, {
    target: `${req.protocol}://${HEADER_BASE_URL}`,
  });
});

app.listen(listeningPort, () => {
  console.log(`Siteurl server started at http://localhost:${listeningPort}`);
});

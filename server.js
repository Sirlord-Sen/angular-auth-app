// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
// const express = require('express');
// const {join} = require("path")
// const app = express();
// // app.use(requireHTTPS);
// app.use(express.static(__dirname + '/dist/authentication-app'));
// app.get('/*', function(req, res) {
//     res.sendFile(join(__dirname + '/dist/authentication-app/index.html'));
// });

// app.listen(process.env.PORT || 8080, () => {
//     console.log("server up")
// })


const express = require("express");
const path = require("path");
const fs = require("fs");
// var proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/**
 * Port to start server on. Prioritizes env.port, then cli argument --port, then defaults to 8002
 * @returns {string}
 */
function findPort() {
  let port = process.env.PORT;
  console.log("port", port, "port");
  if (!port) {
    const [, , ...args] = process.argv;
    let v = args.find((p) => p.search("--port") > -1);
    if (v) {
      port = v.split("=").pop();
    }
  }
  return port || 4200;
}

/**
 * App Variables
 */
const app = express(),
  app_name = "authentication-app",
  base_path = path.join(__dirname, "dist", app_name),
  proxy_config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "proxy.config.json"), {
      encoding: "utf-8",
    })
  );

/**
 * Middlewares
 */
app.use(express.static(base_path)); // Serve app assets from ./dist/${app_name}

for (const path in proxy_config) {
  console.log(proxy_config[path]);
  if (!proxy_config.hasOwnProperty(path)) {
    continue;
  }
  app.use(path, createProxyMiddleware(proxy_config[path])); // Attach proxy for each target
}

/**
 * Serve index page
 */
app.get("*", function (req, res) {
  res.sendFile(path.join(base_path, "index.html"));
});

/**
 * Start Server
 */
let port = findPort();
app.listen(port, () => {
  console.log(`Server is up and running on port ${port} and config url ${proxy_config[path]}`);
});
import { createServer } from "node:http";
import env from "./lib/env.js";

const server = createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from oRPC backend!",
      path: req.url,
      method: req.method,
    }),
  );
});

server.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});

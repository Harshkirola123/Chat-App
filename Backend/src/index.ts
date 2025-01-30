import express from "express";
import loadConfig from "./config/load.config";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import server from "./config/apollo.config";
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
loadConfig();

const PORT = process.env.PORT || 5001;

const init = async () => {
  await server.start();

  const middleware = expressMiddleware(
    server
  ) as unknown as express.RequestHandler;

  app.use("/graphql", middleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();

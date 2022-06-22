import express, { Application } from "express";
import { Server } from "http";

const app: Application = express();

//load environment variables
import dotenv from "dotenv";
dotenv.config();

//connect to the database
import { initDB } from "./config/initDB";
initDB();

//load database models
import "./models/post.model";
import "./models/user.model";

//setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
import router from "./routes/routes";
app.use("/api/v1", router);

//setup error handler
import { errorHandler } from "./middleware/errorHandler.middleware";
app.use(errorHandler);

//start server
const NODE_ENV: string = process.env.NODE_ENV || "development";
const PORT: string = process.env.PORT || "3000";

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});

//handle unhandle rejection
process.on("unhandledRejection", async (err) => {
  console.error(err);
  await server.close();
  process.exit(1);
});

import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan,{ StreamOptions } from "morgan";
import { router } from "./routes";

import { errorHandler } from "./middlewares/error";
import { NotFoundError } from "../src/errors/NotFoundError";
import { Request } from "express";
import cors from "cors-ts";

const app = express();
app.set("trust proxy", true);
//@ts-ignore
app.use(json());
app.use(morgan("dev"))
// app.use(
//   cookieSession({
//     secure: process.env.NODE_ENV !== "test",
//     signed: false,
//   })
// );

app.use(cors<Request>());

app.use(router);

app.use(errorHandler);

export { app };

import "dotenv/config";
import express, { Request, Response, Application } from "express";
import Routes from "./routes.js";
import cors from "cors";
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Good to see you guys");
});

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

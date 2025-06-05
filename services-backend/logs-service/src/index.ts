import express from "express";
import logRouter from "./routes/logRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", logRouter);

app.listen(8200, () => {
  console.log("SERVER UP!!");
});

import express from 'express'
import bp from 'body-parser'
import flipoffRouter from "./routes/flipoff.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bp.urlencoded());
app.use("*", (req, res, next) => {
  console.log("path is", req.originalUrl);
  next();
});
app.get("/test", (req, res) => {
  res.send("test endpoint working");
});

app.use("/flipoff", flipoffRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

import express from "express";
import * as dotenv from "dotenv";
import { Connection } from "./src/core/dbConnection";
import { userRouter } from "./src/routes/user.routes";
import { operationsRouter } from "./src/routes/userOperations.routes";
const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;

Connection.dbconnection();

app.use('/user',userRouter);
app.use('/operation', operationsRouter);

app.listen(port, () => {
    console.log(`Server is lintening at http://localhost:${port}`);
})
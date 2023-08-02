import express from "express";
import * as dotenv from "dotenv";
import { Connection } from "./src/core/dbConnection";
import { userRouter } from "./src/routes/user.routes";
import { operationsRouter } from "./src/routes/userOperations.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;

Connection.dbconnection();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Advertisement Management System",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${port}/`
            }
        ]
    },
    apis: ['./src/swaggerdocs/*'],
};


app.use('/', userRouter);
app.use('/user', userRouter);
app.use('/operation', operationsRouter);

const swaggerDocument = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`Server is lintening at http://localhost:${port}`);
})
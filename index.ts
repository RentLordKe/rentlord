import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

//Sequelize Database Connector
import db from "./src/config/dbconfig";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

//Database Authentication
const dbAuthenticate = async () => {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

dbAuthenticate();

app.get('/', (req: Request, res: Response) => {
    res.json({ping: "pong"});
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
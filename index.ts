import express, { Application } from "express";
import dotenv from "dotenv";

//Sequelize Database Connector
import db from "./src/config/dbconfig";
//User Routes
import userRoutes from "./src/users/userRoutes";
//Property Routes
import propertyRoutes from "./src/properties/propertyRoutes";
//Units Routes
import unitRoutes from "./src/units/unitRoutes";
//Tenants Routes
import tenantRoutes from "./src/tenants/tenantRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

//Database Authentication
const dbAuthenticate = async () => {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
      await db.sync();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

dbAuthenticate();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRoutes);
app.use('/property', propertyRoutes);
app.use('/units', unitRoutes);
app.use('/tenants', tenantRoutes);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
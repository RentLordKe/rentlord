import express, { Application } from "express";
import dotenv from "dotenv";

//Sequelize Database Connector
import { dbAuthenticate } from "./src/config/dbconfig";
//Authentication Routes
import authRoutes from "./src/auth/authRoutes";
//User Routes
import userRoutes from "./src/users/userRoutes";
//Property Routes
import propertyRoutes from "./src/properties/propertyRoutes";
//ManagerRoutes
import managerRoutes from "./src/managers/managerRoutes";
//Units Routes
import unitRoutes from "./src/units/unitRoutes";
//Tenants Routes
import tenantRoutes from "./src/tenants/tenantRoutes";
//Tenant DamagesRoutes
import damageRoutes from "./src/damages/damageRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/property', propertyRoutes);
app.use('/managers', managerRoutes);
app.use('/units', unitRoutes);
app.use('/tenants', tenantRoutes);
app.use('/damages', damageRoutes);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    dbAuthenticate();
});
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../consumer/sequelize/model/customer.model";
import ProductModel from "../product/sequelize/model/product.model";
import { routes } from "./routes/index.route";

export const app: Express = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(routes);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();

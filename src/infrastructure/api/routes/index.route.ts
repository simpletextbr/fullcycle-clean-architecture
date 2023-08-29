import express from "express";
import { customerRoute } from "./customer.route";
import { productRoute } from "./product.route";

export const routes = express.Router();

routes.use("/customer", customerRoute);
routes.use("/product", productRoute);

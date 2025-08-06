import { Router } from "express";
import { Blogroute } from "./blogRoutes";
import { UserRoutes } from "./userRoutes";
import { commentRoutes } from "./commentRoutes";
import subRouter from "../models/router";

const routers=Router();
const allRoutes=[Blogroute,UserRoutes,commentRoutes,subRouter]
routers.use('/api/',...allRoutes)

export {routers}
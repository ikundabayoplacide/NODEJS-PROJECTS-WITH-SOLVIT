import { Router } from "express";
import { Blogroute } from "./blogRoutes";
import { UserRoutes } from "./userRoutes";
import { commentRoutes } from "./commentRoutes";



const routers=Router();
const allRoutes=[Blogroute,UserRoutes,commentRoutes]
routers.use('/api/',...allRoutes)

export {routers}
import mongoose, { Types } from "mongoose";

export type commentType={
comment:string,
blog:mongoose.Types.ObjectId,
user:mongoose.Types.ObjectId,
title:string,
createdAt?:Date,
updatedAt?:Date,
}
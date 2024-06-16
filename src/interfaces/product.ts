import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
     name: string;
     value: number;
     user: mongoose.Types.ObjectId;
}
import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
     product: string;
     theme: string;
     value: number;
     isPaid: boolean;
     user: mongoose.Types.ObjectId;
   }
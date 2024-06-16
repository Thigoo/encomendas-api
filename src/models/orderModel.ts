import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  product: string;
  theme: string;
  value: number;
  isPaid: boolean;
  user: mongoose.Types.ObjectId;
}

const orderSchema: Schema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
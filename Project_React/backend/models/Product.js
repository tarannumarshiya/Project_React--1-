import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Product",
  productSchema
);
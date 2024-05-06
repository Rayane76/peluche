import mongoose from "mongoose";
const Schema = mongoose.Schema;


const SizeSchema = new Schema({
    name: String,
    stock: Number
});

const ColorSchema = new Schema({
    name: String,
    sizes: [SizeSchema],
    mainImage: String,
    images: [String]
});

const Color =
  mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default Color;
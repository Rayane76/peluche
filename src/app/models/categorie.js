import mongoose from "mongoose";
// import Article from "./article";


const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: String,
  stock: Number
});


const ColorSchema = new Schema({
  name: String,
  sizes: [SizeSchema],
  images: [String]
});


const ArticleSchema = new Schema({
    name: String,
    price: Number,
    colors: [ColorSchema]
});


const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    articles: [ArticleSchema]
});

const Categorie =
  mongoose.models.Categorie || mongoose.model("Categorie", CategorySchema);

export default Categorie;
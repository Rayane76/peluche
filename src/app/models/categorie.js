import mongoose from "mongoose";


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
},{
  timestamps: true,
});


const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Men","Women","Kids","Unisex"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    articles: [ArticleSchema]
},{
  timestamps: true,
});

const Categorie =
  mongoose.models.Categorie || mongoose.model("Categorie", CategorySchema);

export default Categorie;
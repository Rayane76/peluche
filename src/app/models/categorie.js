import mongoose from "mongoose";
import Article from "./article";


const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

const Categorie =
  mongoose.models.Categorie || mongoose.model("Categorie", CategorySchema);

export default Categorie;
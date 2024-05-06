import mongoose from "mongoose";
import Color from "./color";


const Schema = mongoose.Schema;



const ArticleSchema = new Schema({
    name: String,
    price: Number,
    colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }]
});


const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
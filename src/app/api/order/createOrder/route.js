import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";
import Order from "@/app/models/order";


export async function POST(req){
    try {
        await connectToDB();

        const {order} = await req.json();
        
        const res = await Order.insertMany(order);


        order.articles.map(async (article)=>{
          let result = await Categorie.findOne({articles: { $elemMatch: { _id: article.id } }})
          if(!result){
            return NextResponse.json({
              success: false,
              message: "Categorie not found",
            });
          }
            let search = result.articles.id(article.id);
            if(!search){
              return NextResponse.json({
                success: false,
                message: "Article not found!",
              });
            }
             let color = search.colors.find(c => c.name === article.color);
             if(!color){
              return NextResponse.json({
                success: false,
                message: "Color not found!",
              });
             }
             let size = color.sizes.find(s => s.name === article.size);
             if(!size){
              return NextResponse.json({
                success: false,
                message: "Size not found!",
              });
             }

             size.stock = size.stock - article.quantity;

             result.save();

            }
          
        )


        return NextResponse.json({
            success: true,
            message: "Order Added"
          });


    } catch (error) {
         console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
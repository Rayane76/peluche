import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";



export async function POST(req){


    try {
        await connectToDB();
  
           const {id,article} = await req.json();
  
           const result = await Categorie.findOne({_id : id})

           result.articles.map((art)=>{
             if(art._id.toString() === article._id){
                art.name = article.name,
                art.colors = article.colors,
                art.images = article.images
             }
           })

           result.save();

          
          return NextResponse.json({
              success: true,
              message: "Article Added"
            });
         
        } catch (e) {
          console.log(e);
      
          return NextResponse.json({
            success: false,
            message: "Something went wrong!",
          });
        }


}
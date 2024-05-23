import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";



export async function GET(req){

  const searchParams = req.nextUrl.searchParams;
  const article = searchParams.get("article");

  
    try {
        await connectToDB();
  
        

        const result = await Categorie.findOne({articles: { $elemMatch: {_id: article}}});

        
        if(!result){
            return NextResponse.json({
                success: false,
                message: "Categorie not found !",
              });
        }

        const search = result.articles.id(article);
        if(!search){
            return NextResponse.json({
                success: false,
                message: "Article not found !",
              });
        }

        return NextResponse.json({
            data: search,
            success: true,
            message: "success !",
          });
        
       
      } catch (e) {
        console.log(e);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
      }
} 
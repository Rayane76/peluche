import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function POST(req){


    try {
      await connectToDB();

         const {id,newArticle} = await req.json();

         console.log(newArticle)

         const result = await Categorie.findOneAndUpdate({_id: id}, { $push: { articles: newArticle  } });
        
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



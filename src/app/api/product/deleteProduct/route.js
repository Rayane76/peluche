import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";




export async function DELETE(req){

    try {
        await connectToDB();
   
        const searchParams = req.nextUrl.searchParams;
        const categorie = searchParams.get("categorie");
        const article = searchParams.get("article");

        

        const result = await Categorie.findOneAndUpdate({_id: categorie},{ $pull: {articles: {_id: article}}});

        return NextResponse.json({
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
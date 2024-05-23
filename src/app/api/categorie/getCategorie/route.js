import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function GET(req){


  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  
    try {
        await connectToDB();
  
        

        const result = await Categorie.findOne({_id: id});

        return NextResponse.json({
            data: result,
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
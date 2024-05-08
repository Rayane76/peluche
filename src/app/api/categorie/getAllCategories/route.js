import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function GET(req){

  const searchParams = req.nextUrl.searchParams;
  const gender = searchParams.get("gender");

    try {
        await connectToDB();
        const result = await Categorie.find({gender: gender});

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
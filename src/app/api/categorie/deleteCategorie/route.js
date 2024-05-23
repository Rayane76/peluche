import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";




export async function DELETE(req){

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

    try {
        await connectToDB();
        const result = await Categorie.deleteOne({_id: id});

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
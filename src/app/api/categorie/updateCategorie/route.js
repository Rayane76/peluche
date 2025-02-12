import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";

export async function PATCH(req){

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const newName = searchParams.get("newName");
  const newImage = searchParams.get("newImage");
    
    try {
        await connectToDB();

        const result = await Categorie.updateOne({_id: id}, {name: newName , image: newImage});

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
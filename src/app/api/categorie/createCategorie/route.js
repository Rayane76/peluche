import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function POST(req){


    try {
      await connectToDB();
        // console.log(req.json());

         const {categorie} = await req.json();

        const result = await Categorie.insertMany({
            name: categorie.name,
            gender: categorie.gender,
            image: categorie.image,
            articles: [],
        });
        
        return NextResponse.json({
            success: true,
            message: "Section Added"
          });
       
      } catch (e) {
        console.log(e);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
      }
    }







import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";



export async function GET(req){
    try {
        await connectToDB();

        const searchParams = req.nextUrl.searchParams;

        const name = searchParams.get("name");
        const gender = searchParams.get("gender");

        let result = {};

        if(gender === 'Men' || gender === 'Women'){
            result = await Categorie.findOne({ $or: [ { gender: gender }, { gender: "Unisex" } ] , name: name });
        }
        else{
            result = await Categorie.findOne({name: name, gender: gender});
        }

        return NextResponse.json({
            data: result.articles,
            success: true,
            message: "success !",
          });


    } catch (error) {
        console.log(e);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
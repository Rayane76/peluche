import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";



export async function GET(req){

    const searchParams = req.nextUrl.searchParams;

    const name = searchParams.get("name");
    const gender = searchParams.get("gender");

    try {
        await connectToDB();

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
        console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
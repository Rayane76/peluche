import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function GET(){
    try {
        
        await connectToDB();

        const result = await Categorie.find({});

        // let res = [];

        // if(result){
        //     result.map((categorie)=>{
        //         res.push({name: categorie.name, gender: categorie.gender, image: categorie.image, _id: categorie._id});
        //     })
        // }


        return NextResponse.json({
            data: result,
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
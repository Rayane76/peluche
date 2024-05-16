import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";


export async function GET(req){
    try {
        await connectToDB();


        const categories = await Categorie.find({});

        let dates = [];

        categories.map((categorie)=>{
            categorie.articles.map((article)=>{
                dates.push(article);
            })
        })

        dates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // const first10Products = dates.slice(0, 10);

        dates.reverse();


        return NextResponse.json({
            data: dates,
            success: true,
            message: "Article Added"
          });


    } catch (error) {
        console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
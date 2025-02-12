import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Categorie from "@/app/models/categorie";
import Order from "@/app/models/order";


export async function POST(req){
    try {
        await connectToDB();

        const {id} = await req.json();

        const res = await Order.deleteOne({_id: id});




        return NextResponse.json({
            success: true,
            message: "Order Added"
          });


    } catch (error) {
         console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
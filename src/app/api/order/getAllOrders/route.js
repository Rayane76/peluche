import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Order from "@/app/models/order";


export async function GET(req){
    try {
        await connectToDB();

        const res = await Order.find({});  


        return NextResponse.json({
            data: res,
            success: true,
            message: "Order Added"
          });

        }


     catch (error) {
         console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}
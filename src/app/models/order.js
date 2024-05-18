import mongoose from "mongoose";


const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    neighborhood:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    articles: [{
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Waiting","Completed"]
    }
},{
    timestamps: true
});

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
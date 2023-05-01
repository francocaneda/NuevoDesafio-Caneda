import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

import { Schema } from "mongoose";

import paginate from "mongoose-paginate-v2";



const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        required: true,
        default: ["/img/noImg"]
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})



productSchema.plugin(paginate);

export class productManagerMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
      
    }
    async paginate(filter,options){
        this.setConnection();
        try{
            return await this.model.paginate(filter,options)
        }catch(error){
            return error;
        }
    }
    async aggregate(options){
        this.setConnection();
        try{
            return await this.model.aggregate(options)
        }catch(error){
            return error;
        }
    }
}
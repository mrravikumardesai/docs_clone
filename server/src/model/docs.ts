import mongoose from "mongoose";
interface Docs {
    _id: string;
    doc: object;
    title:string
}

// Declare the Schema of the Mongo model
var docsSchema = new mongoose.Schema<Docs>({
    _id: {
        type: String,
    },
    doc: {
        type: Object,
        required: true,
    },
    title:{
        type:String
    }
},

 { timestamps: true });

const Docs = mongoose.model("Docs", docsSchema)

export default Docs
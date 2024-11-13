import mongoose from "mongoose"

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    await mongoose.connect('mongodb://0.0.0.0:27017/docs_clone');
    const db = mongoose.connection;

    db.on("error", (err) => console.log("ERROR", err));
    db.once("open", function () {
        console.log("Connected successfully");
    });

}

export default connectToDb



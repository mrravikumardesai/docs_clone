import mongoose from "mongoose";
interface User {
    name: string;
    email: object;
    password: string;
}

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already used'],
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema)

export default User
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const walletSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
        unique: true
    },
    balance: {
        type: mongoose.Decimal128,
        required: true,
        default: 0.00
    }   
},
{timestamps: true}
);

export default mongoose.model("Wallet", walletSchema)
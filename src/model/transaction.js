import mongoose from "mongoose";
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    trnxType: {
        type: String,
        required: true,
        enum: ['CR', 'DR']
    },
    purpose: {
        type: String,
        enum: ['deposit', 'transfer', 'reversal', 'withdrawal'],
        required: true
    },
    amount: {
        type: mongoose.Decimal128,
        required: true,
        default: 0.00
    },
    walletUsername: {
        type: String,
        ref: 'Wallet'
    },
    reference: { type: String, required: true},
    balanceBefore: {
        type: mongoose.Decimal128,
        required: true,
    },
    balanceAfter: {
        type: mongoose.Decimal128,
        required: true,
    },
    summary: { type: String, required: true },
    trnxSummary: { type: String, required: true }
},
{ timestamps: true}
);
export default mongoose.model('Transaction', transactionSchema);
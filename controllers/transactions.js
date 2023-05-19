import transactions from "../src/model/transaction.js";
import mongoose from "mongoose";
import {v4} from "uuid";
import { creditAccount, debitAccount } from "../utility/transactins.js";


export async function transfer(req, res){
    const session = await mongoose.startSession();
    session.startTransaction()
    try{
        const { toUsername, fromUsername, amount, summary } = req.body;
        const reference = v4();
        if(!toUsername || !fromUsername || !amount || !summary) {
            return res.status(400).json({
                message: "please provide the nedded details"
            })
        }

        const transferResult = await Promise.all([
            debitAccount(
                {amount, username:fromUsername, purpose:"transfer", reference, summary, trnxSummary:`TRFR TO: ${toUsername}. TRNX REF: ${reference}`, session}
            ),
            creditAccount(
                {amount, username:toUsername, purpose:"transfer", reference, summary, trnxSummary: `TRFR FROM: ${fromUsername}. TRNX REF:${reference}`, session}
            )
        ]);

        const failedTxns = transferResult.filter((result)=> result.status !== true);
        if (failedTxns.length) {
            const errors = failedTxns.map(a => a.message);
            await session.abortTransaction();
            return res.status(400).json(errors);
        }
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Transfer successful"
        })
    } catch(err){
        await session.abortTransaction();
        session.endSession();
        console.log(err)
        return res.status(500).json(err);
    }
}
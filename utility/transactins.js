import wallets from "../src/model/wallet.js";
import transactions from "../src/model/transaction.js";

export async function creditAccount ({amount, username, purpose, reference, summary, trnxSummary, session}){
    const wallet = await wallets.findOne({username});
    if(!wallet){
        return res.status(404).json({
            "message": `user ${username} does not exist`
        })
    }

    const updatedWallet = await wallets.findOneAndUpdate({username}, { $inc: {balance: amount }}, {session});

    const transaction = await transactions.create([{
        trnxType: 'CR',
        purpose,
        amount,
        username,
        balanceBefore: Number(wallet.balance),
        balanceAfter: Number(wallet.balance) + Number(amount),
        summary,
        trnxSummary
    }], {session});

    return res.status(200).json({
        message: 'credit successfully',
        data: {updatedWallet, transaction}
    })
};

export async function debitAccount({amount, username, purpose, reference, summary, trnxSummary, session}){
    const wallet = await wallets.findOne({username});
    if(!wallet){
        return {
            status: false,
            message: `User ${username} doesn\'t exist`
          }
    }

    if(Number(wallet.balance) < amount){
        return res.status(400).json({
            message: `user ${username} has insufficient balance`
        })
    }

    const updatedWallet = await wallets.findByIdAndUpdate({username}, {$inc: {balance: -amount}}, {session});
    const transaction = await transactions.create([{
        trnxType: 'DR',
        purpose,
        amount,
        username,
        reference,
        balanceBefore: Number(wallet.balance),
        balanceAfter: Number(wallet.balance) - Number(amount),
        summary,
        trnxSummary
    }], {session});

    return res.status(200).json({
        message: "debit successful",
        data: {updatedWallet, transaction}
    })
}
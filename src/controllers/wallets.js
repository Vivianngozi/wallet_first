import wallets from "../model/wallet.js";

export async function  createWallet (req, res){
    try{
        const {username, balance} = req.body;

        const walletExists = await wallets.findOne({username});
        if(walletExists){
            return res.status(409).json({
                "message": "Wallet already exists"
            })
        }

        const result = await wallets.create({username, balance});
        return res.status(201).json({
            status: true,
            message: 'wallet created successfully',
            data: result
        })
    } catch(err){
        res.status(500).json(err)
    }
}
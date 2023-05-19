import express from 'express';
const router = express.Router();
import { createWallet } from '../../controllers/wallets.js';
import { transfer } from '../../controllers/transactions.js';


router.post('/create', createWallet);
router.post('/transfer', transfer);



export { router };
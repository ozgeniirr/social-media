import express from 'express'
import redis from './redis'

const router = express.Router();

router.get('/set', async(req, res )=> {
    await redis.set("message", "Merhaba Özge!", "EX", 60);
    res.send("Veri Redise kaydedildi.")
});


router.get('/get', async(req, res )=>{
    const value = await redis.get("message");
    res.send(`Redis ten gelen veri : ${value}`);
});
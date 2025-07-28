import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("connect", () => {
  console.log("✅ Redis bağlantısı başarılı!");
});

redis.on("error", (err) => {
  console.error("❌ Redis bağlantı hatası:", err);
});

export default redis;

### 📦 Social Media Backend

Bu proje, bir sosyal medya platformunun **backend API** tarafını TypeScript ve Express.js ile geliştirir. Kullanıcı kimlik doğrulama, takip sistemi ve gerçek zamanlı bildirim altyapısı (Socket.IO + Redis) içerir.

---

### 🚀 Özellikler

* 🔐 JWT tabanlı kullanıcı kayıt & giriş sistemi
* 👥 Kullanıcılar arası **takip / takipten çıkma** sistemi
* 📩 **Gerçek zamanlı bildirimler** (Socket.IO + Redis Pub/Sub)
* 🧪 Test için özel token desteği (`.env` → `TEST_TOKEN`)
* 🧰 Postman Collection ve örnek test dosyası (`socket-test.ts`)

---

### 🛠️ Kullanılan Teknolojiler

* **Node.js + Express.js**
* **TypeScript**
* **Prisma ORM + PostgreSQL**
* **Redis** (bildirim yayını için)
* **Socket.IO** (gerçek zamanlı bağlantılar için)
* **Docker & Docker Compose**

---

### 🔧 Çalıştırma

```bash
# 1. Bağımlılıkları kur
npm install

# 2. Ortam değişkenlerini tanımla (.env)
cp .env.example .env

# 3. Docker ile PostgreSQL ve Redis başlat
docker-compose up -d

# 4. Backend başlat
npm run dev
```

---

### 🧪 Test

Socket bildirimlerini test etmek için `socket-test.ts` dosyasını kullanabilirsin:

```bash
npx ts-node socket-test.ts
```

import app from "./src/app"; // sadece app import edilir

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
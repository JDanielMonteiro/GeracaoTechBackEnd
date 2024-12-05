require("dotenv").config();
const express = require("express");
const app = express();
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");

app.use(express.json());
app.use("/api", publicRoutes);
app.use("/api", privateRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

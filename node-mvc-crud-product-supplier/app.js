require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const methodOverride = require("method-override");

const app = express();

// Bootstrap static
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Trang chủ hiển thị index.ejs
app.get("/", (req, res) => {
  res.render("index");  // Tìm file views/index.ejs
});

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// Connect DB & start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));


  const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Supplier API",
      version: "1.0.0",
      description: "RESTful API cho quản lý Suppliers và Products",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL server local
      },
    ],
  },
  apis: ["./routes/*.js"], // Chỉ đường dẫn đến các route để Swagger đọc annotation
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

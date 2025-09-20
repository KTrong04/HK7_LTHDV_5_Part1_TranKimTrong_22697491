require("dotenv").config();
const mongoose = require("mongoose");
const Supplier = require("./models/Supplier");
const Product = require("./models/Product");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Supplier.deleteMany({});
  await Product.deleteMany({});

  const s1 = await Supplier.create({ name: "Supplier A", address: "HCMC", phone: "0123456789" });
  const s2 = await Supplier.create({ name: "Supplier B", address: "Hanoi", phone: "0987654321" });

  await Product.create({ name: "Product 1", address: "P1 address", phone: "0312345678", supplierId: s1._id });
  await Product.create({ name: "Product 2", address: "P2 address", phone: "0398765432", supplierId: s2._id });

  console.log("Seeded DB");
  mongoose.disconnect();
}

seed().catch(err => console.error(err));

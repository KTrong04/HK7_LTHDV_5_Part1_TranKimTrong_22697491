const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },          // tên sản phẩm
  price: { type: Number, required: true },         // giá sản phẩm
  quantity: { type: Number, required: true },      // số lượng
  supplierId: {                                    // FK đến supplier
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     description: Hiển thị trang danh sách tất cả sản phẩm, kèm thông tin nhà cung cấp.
 *     responses:
 *       200:
 *         description: Trang danh sách sản phẩm (HTML)
 *       500:
 *         description: Lỗi server
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("supplierId")
      .sort({ createdAt: -1 });
    res.render("products/index", { products });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /products/new:
 *   get:
 *     summary: Hiển thị form tạo sản phẩm mới
 *     tags: [Products]
 *     description: Hiển thị form nhập thông tin sản phẩm, kèm danh sách nhà cung cấp.
 *     responses:
 *       200:
 *         description: Trang form tạo sản phẩm
 *       500:
 *         description: Lỗi server
 */
exports.newProductForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("products/new", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     description: Nhận dữ liệu từ form và tạo sản phẩm mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *               - supplierId
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplierId:
 *                 type: string
 *                 description: ID của nhà cung cấp
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách sản phẩm
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;
    await Product.create({ name, price, quantity, supplierId });
    res.redirect("/products");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @swagger
 * /products/edit/{id}:
 *   get:
 *     summary: Hiển thị form chỉnh sửa sản phẩm
 *     tags: [Products]
 *     description: Hiển thị form chỉnh sửa sản phẩm theo ID, kèm danh sách nhà cung cấp.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần chỉnh sửa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trang form chỉnh sửa sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi server
 */
exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    if (!product) return res.status(404).send("Product not found");
    res.render("products/edit", { product, suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     description: Cập nhật thông tin sản phẩm theo ID với dữ liệu từ form.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplierId:
 *                 type: string
 *                 description: ID của nhà cung cấp
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách sản phẩm
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplierId } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplierId });
    res.redirect("/products");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     description: Xóa sản phẩm theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách sản phẩm
 *       500:
 *         description: Lỗi server
 */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const Supplier = require("../models/Supplier");

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Lấy danh sách nhà cung cấp
 *     tags: [Suppliers]
 *     description: Hiển thị trang danh sách tất cả nhà cung cấp đã tạo.
 *     responses:
 *       200:
 *         description: Trang danh sách nhà cung cấp (HTML)
 *       500:
 *         description: Lỗi server
 */
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.render("suppliers/index", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /suppliers/new:
 *   get:
 *     summary: Hiển thị form tạo nhà cung cấp mới
 *     tags: [Suppliers]
 *     description: Hiển thị trang form để người dùng nhập thông tin nhà cung cấp mới.
 *     responses:
 *       200:
 *         description: Trang form tạo nhà cung cấp
 */
exports.newSupplierForm = (req, res) => {
  res.render("suppliers/new");
};

/**
 * @swagger
 * /suppliers/create:
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     tags: [Suppliers]
 *     description: Nhận dữ liệu từ form và tạo nhà cung cấp mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách nhà cung cấp
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
exports.createSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @swagger
 * /suppliers/edit/{id}:
 *   get:
 *     summary: Hiển thị form chỉnh sửa nhà cung cấp
 *     tags: [Suppliers]
 *     description: Hiển thị trang form chỉnh sửa thông tin nhà cung cấp theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà cung cấp cần chỉnh sửa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trang form chỉnh sửa nhà cung cấp
 *       404:
 *         description: Không tìm thấy nhà cung cấp
 *       500:
 *         description: Lỗi server
 */
exports.editSupplierForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send("Supplier not found");
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp
 *     tags: [Suppliers]
 *     description: Cập nhật thông tin nhà cung cấp theo ID với dữ liệu từ form.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà cung cấp cần cập nhật
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
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách nhà cung cấp
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
exports.updateSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Xóa nhà cung cấp
 *     tags: [Suppliers]
 *     description: Xóa nhà cung cấp theo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà cung cấp cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Chuyển hướng về danh sách nhà cung cấp
 *       500:
 *         description: Lỗi server
 */
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

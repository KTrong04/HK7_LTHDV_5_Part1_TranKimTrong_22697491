const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API quản lý nhà cung cấp
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Lấy danh sách nhà cung cấp
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Trang danh sách nhà cung cấp (HTML)
 *       500:
 *         description: Lỗi server
 */
router.get("/", supplierController.getSuppliers);

/**
 * @swagger
 * /suppliers/new:
 *   get:
 *     summary: Hiển thị form tạo nhà cung cấp mới
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Trang form tạo nhà cung cấp
 */
router.get("/new", supplierController.newSupplierForm);

/**
 * @swagger
 * /suppliers/create:
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     tags: [Suppliers]
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
router.post("/create", supplierController.createSupplier);

/**
 * @swagger
 * /suppliers/edit/{id}:
 *   get:
 *     summary: Hiển thị form chỉnh sửa nhà cung cấp
 *     tags: [Suppliers]
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
router.get("/edit/:id", supplierController.editSupplierForm);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp
 *     tags: [Suppliers]
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
router.put("/:id", supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Xóa nhà cung cấp
 *     tags: [Suppliers]
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
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;

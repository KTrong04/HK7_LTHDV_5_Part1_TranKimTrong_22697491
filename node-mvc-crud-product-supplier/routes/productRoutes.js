const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Trang danh sách sản phẩm (HTML)
 *       500:
 *         description: Lỗi server
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /products/new:
 *   get:
 *     summary: Hiển thị form tạo sản phẩm mới
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Trang form tạo sản phẩm
 *       500:
 *         description: Lỗi server
 */
router.get("/new", productController.newProductForm);

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
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
router.post("/create", productController.createProduct);

/**
 * @swagger
 * /products/{id}/edit:
 *   get:
 *     summary: Hiển thị form chỉnh sửa sản phẩm
 *     tags: [Products]
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
router.get("/:id/edit", productController.editProductForm);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
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
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
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
router.delete("/:id", productController.deleteProduct);

module.exports = router;

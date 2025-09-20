```markdown
# Node MVC CRUD Project

## Mô tả
Dự án này là ứng dụng **Node.js theo kiến trúc MVC** để quản lý **Products** và **Suppliers**.  
Ứng dụng sử dụng **Express**, **MongoDB**, **Mongoose** và **EJS** cho template.  
Ngoài ra, dự án hỗ trợ **Swagger** để mô tả các RESTful API.

---

## Tính năng
- Quản lý nhà cung cấp (CRUD)
- Quản lý sản phẩm (CRUD, liên kết với nhà cung cấp)
- Form tạo, chỉnh sửa, xóa, danh sách sản phẩm và nhà cung cấp
- Sử dụng `.env` để cấu hình MongoDB và PORT
- Swagger API documentation

---

## Cấu trúc thư mục
```

node-mvc-crud-product-supplier/
├─ controllers/       # Chứa các controller xử lý logic
├─ models/            # Chứa các model Mongoose
├─ routes/            # Chứa các route cho Suppliers và Products
├─ views/             # Chứa file EJS
├─ public/            # Chứa file tĩnh (CSS, JS, images)
├─ app.js             # File khởi tạo server Express
├─ package.json
└─ .env.example       # File cấu hình môi trường mẫu

## Cài đặt và chạy dự án

1. Clone repository:
```bash
git clone https://github.com/KTrong04/HK7_LTHDV_5_Part1.git
````

2. Di chuyển vào thư mục project:

```bash
cd node-mvc-crud-product-supplier
```

3. Cài các package cần thiết:

```bash
npm install
```

4. Tạo file `.env` dựa trên `.env.example`:

```
MONGO_URI=mongodb://127.0.0.1:27017/mvc_crud_db
PORT=3000
```

5. Chạy ứng dụng:

```bash
npm start
```

6. Mở trình duyệt và truy cập:

```
http://localhost:3000/
```

---

## API Documentation (Swagger)

* Nếu đã cấu hình Swagger, bạn có thể truy cập đường dẫn tương ứng để xem mô tả các RESTful API.
* Ví dụ: `http://localhost:3000/api-docs`

---

## License

Dự án này dùng cho mục đích **học tập và thực hành**.


import express from "express";
import { pool } from "../db.js";
import cors from "cors";
// import argon2 from "argon2";
// import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());// middleware bawaan 
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
); 

// // login
// app.post("/api/login", async (req, res) => {
//     const result = await pool.query("SELECT * FROM users WHERE username = $1", [
//       req.body.username,
//     ]);
//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       if (await argon2.verify(user.password, req.body.password)) {
//         const token = jwt.sign(user, process.env.SECRET_KEY);
//         res.send({
//           token,
//           message: "Login berhasil.",
//         });
//       } else {
//         res.status(401);
//         res.send("Kata sandi salah.");
//       }
//     } else {
//       res.status(404);
//       res.send(
//         `Pengguna dengan nama pengguna ${req.body.username} tidak ditemukan.`
//       );
//     }
//   });

// // register
// app.post("/api/register", async(req,res)=>{  
//         const hash= await argon2.hash(req.body.password);
//         console.log(hash);
//         const result= await pool.query(
//             "INSERT INTO users (username,password) VALUES ($1, $2) RETURNING *",
//             [req.body.username, hash]
//         )
//         res.send("pendaftaran berhasil");
// });

// // midleware otentikasi
// app.use((req, res, next) => {
//     const authorization = req.headers.authorization;
//     console.log("Authorization Header:",authorization);
//     if (authorization) {
//       if (authorization.startsWith("Bearer ")) {
//         const token = authorization.split(" ")[1];
//         console.log("Token:", token); // Log token
//         try {
//           req.user = jwt.verify(token, process.env.SECRET_KEY);
//           next();
//         } catch (error) {
//           res.send("Token tidak valid.");
//         }
//       } 
//       else {
//         res.send('Otorisasi tidak valid (harus "Bearer").');
//       }
//     } 
//     else {
//       res.send("Anda belum login (tidak ada otorisasi).");
//     }
// })

app.get("/api/coba", async(req,res)=>{
    res.send("assalamualaikum");
})
app.post("/api/products", async (req,res)=>{
    const result = await pool.query(
        "INSERT INTO products (name,price,imageurl) VALUES ($1, $2, $3) RETURNING * ", 
        [req.body.name, req.body.price, req.body.imageurl]);
        // res.send("berhasil ditambah");
        res.json(result.rows[0]); //
})
app.get("/api/products", async (req,res)=>{
    const result= await pool.query("SELECT * FROM products");
    res.json(result.rows);
})
app.put("/api/products/:id", async (req,res)=>{
    await pool.query(
        "UPDATE products SET name = $1, price= $2, imageurl= $3 WHERE id = $4",
        [req.body.name, req.body.price, req.body.imageurl, req.params.id] 
    );
    res.send("berhasil di update");
})
app.delete("/api/products/:id", async (req,res)=>{
    await pool.query("DELETE FROM products WHERE id= $1", 
        [req.params.id]
    );
    res.send("berhasil dihapus")
})
app.listen(3000, ()=> console.log("server berhasil di jalankan"));
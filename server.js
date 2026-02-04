const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

// Allow your Live Server origins
app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));

app.use(express.json());

// Storage engine for uploaded files
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Upload endpoint
app.post("/upload", upload.single("pfp"), (req, res) => {
    const fileUrl = `http://127.0.0.1:3000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});

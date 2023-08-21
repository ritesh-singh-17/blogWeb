const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const postRoutes = require('./routes/posts.js');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const multer = require('multer');
require('dotenv').config();
const port = process.env.PORT || 8800;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["https://blogweb-gjnd.onrender.com"],
    methods: ["POST", "GET", "DELETE`", "PUT"],
    credentials: true
}));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FB_STORAGEBUCKET,
});

const bucket = admin.storage().bucket();
const upload = multer({
    storage: multer.memoryStorage(),
})

app.post('/api/upload', upload.single('file'), async function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;

        const file = bucket.file(fileName);

        const uploadOptions = {
            resumable: false,
            metadata: {
                contentType: req.file.mimetype,
            },
        };

        await file.save(fileBuffer, uploadOptions);

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        res.json({ success: true, fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
})


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, () => {
    console.log(`Listening to server ${port}`)
})
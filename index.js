const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")
const CategoryRoutes = require("./routes/categories")
const multer = require("multer")

dotenv.config()
app.use(express.json())

//DB config
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

//image Upload / Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, "image.png")
  },
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded successfully.")
  } catch (error) {
    res.status(500).json(error)
  }
})

//Routing
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/category", CategoryRoutes)

app.listen("5000", () => {
  console.log("Backend is running now ")
})

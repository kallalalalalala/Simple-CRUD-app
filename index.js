const express = require("express");
const mongoose = require("mongoose");
const app = express();
const product = require("./models/product.model.js");

app.use(express.json());

app.get("/", (req, res) => {});

app.post("/api/product", async (req, res) => {
   try {
    const pro = await product.create(req.body);
    res.status(200).json(pro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const pro = await product.find();
    res.status(200).json(pro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pro = await product.findById(id);
    res.status(200).json(pro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update product

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pro = await product.findByIdAndUpdate(id, req.body);

    if (!pro) {
      return res.status(404).json({ message: "Product not found" });
    }

    const UpdateProduct = await product.findByIdAndUpdate(id);

    res.status(200).json(UpdateProduct);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/product/:id", async(req, res) =>{
  try {
    const { id } = req.params;
    const pro = await product.findByIdAndDelete(id);

    if (!pro) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted succesfully " });

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Verrifiaction ne la connecetion den la base de donnee et la configuration du server et de son port
mongoose.connect("mongodb+srv://:@cluster0.wn1rf.mongodb.net/NodeApi?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

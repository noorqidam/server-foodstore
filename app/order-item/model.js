const mongoose = require("mongoose");
const { model, Schema} = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minglength: [5, "Panjang nama makanan minimal 50 karakter"],
    required: [true, "name must be filled"]
  },
  price: {
    type: Number,
    required: [true, "Harga item harus diisi"]
  },
  qty: {
    type: Number
  }
})
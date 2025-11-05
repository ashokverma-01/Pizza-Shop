import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  imageUrl: String,
  imageId: String,
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Category", categorySchema);

import mongoose from "mongoose";

const draftSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  content: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

const Draft = mongoose.model('Draft', draftSchema);
export default Draft
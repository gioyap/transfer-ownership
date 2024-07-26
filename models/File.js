// models/File.js
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  fileId: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
});

const File = mongoose.models.File || mongoose.model('File', FileSchema);

export default File;

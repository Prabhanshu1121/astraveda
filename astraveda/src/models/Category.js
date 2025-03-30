import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create slug from name before saving
categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;

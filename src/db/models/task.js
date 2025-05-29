import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['home', 'kids', 'work', 'self', 'other'],
      default: 'other',
    },
    dueDate: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

const TaskCollection = model('task', taskSchema);

export default TaskCollection;

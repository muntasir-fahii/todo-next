import mongoose, { Schema } from "mongoose";

interface Task {
  text: string;
  status: boolean;
}
// todo schema
const todoSchema = new mongoose.Schema<Task>(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", todoSchema);
export default Task;

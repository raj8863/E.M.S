import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true},
    description: {type: String, required: true},
    date: { type: Date, required: true },
    category: {  type: String,  required: true},
    active: { type: Boolean, default: false
    },
    newTask: {type: Boolean,default: true },
    completed: { type: Boolean, default: false },
    failed: {type: Boolean,default: false  }
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: {  type: String,required: true, trim: true},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {  type: String,  required: true },
    role: { type: String, enum: ["admin", "employee"], default: "employee" },
    tasks: [TaskSchema]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

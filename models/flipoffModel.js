import db from "../dbConnect.js";
import mongoose from "mongoose";

const flipoffSchema = db.Schema({
  flipoffMessage: String,
  upVotes: Number,
  downVotes: Number,
  reFlip: String,
  createdDate: Date
});

export const flipoffObject = db.model("flipoff", flipoffSchema, "flipoffs");

export const createFlipoff = async (newFlipoff) => {
  try {
    const createdFlipoff = await flipoffObject.create(newFlipoff);
    return createdFlipoff;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate Error");
    } else {
      throw error;
    }
  }
};

export const updateFlipoff = async (id, updatedFlipoffData) => {
  const response = await flipoffObject.findByIdAndUpdate(id, updatedFlipoffData, {
    new: true,
  });
  return response;
};

export const findOneFlipoffByID = async (id) => {
  const flipoff = await flipoffObject.findById(id);
  return flipoff;
};

export const deleteFlipoff = async (id) => {
  const response = await flipoffObject.findByIdAndDelete(id);
  return response;
};

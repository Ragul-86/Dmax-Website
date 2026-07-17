import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactEnquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 255,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    budget: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
    emailNotified: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: "website-contact-form",
    },
    ip: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

ContactEnquirySchema.index({ createdAt: -1 });

export const ContactEnquiry = mongoose.model("ContactEnquiry", ContactEnquirySchema);

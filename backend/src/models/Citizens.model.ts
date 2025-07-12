import mongoose, { Document, Schema } from "mongoose";

export interface Citizen extends Document {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  phoneNumber: string;
  address: string;
  appointments: string[];
  requests: string[];
  biometricData: {
    facialVector: number[];
  };
  emergencyProfile: {
    bloodType: string;
    allergies: string[];
    emergencyContacts: {
      name: string;
      phone: string;
      relationship: string;
    }[];
  };
  administrativeRequests: string[];
}

const CitizenSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  biometricData: {
    facialVector: { type: [Number], select: false },
  },
  emergencyProfile: {
    bloodType: String,
    allergies: [String],
    emergencyContacts: [
      {
        name: String,
        phone: String,
        relationship: String,
      },
    ],
  },
  administrativeRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Demande",
    },
  ],
});

export default mongoose.model<Citizen>("Citizen", CitizenSchema);

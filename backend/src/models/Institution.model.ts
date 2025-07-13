import mongoose, { Document, Schema } from "mongoose";

export interface Institution {
  name: string;
  type: 'hospital' | 'city_hall' | 'administration';
  address: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  apiKeys: {
    key: string;
    permissions: string[];
    active: boolean;
    lastUsed: Date;
  }[];
  staff: string[];
  appointments: string[];
  requests: string[];
  emergencyAccess: {
    enabled: boolean;
    facialRecognition: boolean;
    emergencyContacts: string[];
  };
  statistics: {
    totalRequests: number;
    averageProcessingTime: number;
    satisfactionScore: number;
    lastUpdated: Date;
  };
  services: {
    name: string;
    description: string;
    processingTime: number;
    availableSlots: number;
  }[];
}

export interface InstitutionDocument extends Institution, Document {
  _id: string;
}

const InstitutionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  type: {
    type: String,
    enum: ['hospital', 'city_hall', 'administration'],
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  contact: {
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\+?[1-9]\d{1,14}$/.test(v),
        message: 'Phone number is invalid'
      }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
        message: 'Email is invalid'
      }
    },
    website: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(v),
        message: 'Website URL is invalid'
      }
    }
  },
  apiKeys: [{
    key: { type: String, unique: true },
    permissions: [{
      type: String,
      enum: ['read_citizen_data', 'write_requests', 'manage_appointments', 'emergency_access']
    }],
    active: { type: Boolean, default: true },
    lastUsed: Date
  }],
  staff: [{
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Demande'
  }],
  emergencyAccess: {
    enabled: { type: Boolean, default: false },
    facialRecognition: { type: Boolean, default: false },
    emergencyContacts: [{
      type: Schema.Types.ObjectId,
      ref: 'Citizen'
    }]
  },
  statistics: {
    totalRequests: { type: Number, default: 0 },
    averageProcessingTime: { type: Number, default: 0 },
    satisfactionScore: { type: Number, default: 0 },
    lastUpdated: Date
  },
  services: [{
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500
    },
    processingTime: {
      type: Number,
      required: true,
      min: 0
    },
    availableSlots: {
      type: Number,
      required: true,
      min: 0
    }
  }]
}, {
  timestamps: true
});

export const institution = mongoose.model<InstitutionDocument>("Institution", InstitutionSchema);

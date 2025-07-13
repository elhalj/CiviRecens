import mongoose, { Document, Schema } from "mongoose";

// Define the Staff interface for type checking
export interface Staff {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  role: 'admin' | 'manager' | 'receptionist' | 'technician' | 'other';
  department: string;
  schedule: {
    start: Date;
    end: Date;
    days: string[];
  };
  currentAppointments: string[];
  availability: {
    status: 'available' | 'busy' | 'on_break' | 'off_duty';
    nextAvailable: Date;
  };
  permissions: {
    readCitizenData: boolean;
    writeRequests: boolean;
    manageAppointments: boolean;
    emergencyAccess: boolean;
  };
  credentials: {
    lastLogin: Date;
    failedAttempts: number;
  };
  emergencyAccess: {
    enabled: boolean;
    facialRecognition: boolean;
  };
}

export interface StaffDocument extends Staff, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => /^\+?[1-9]\d{1,14}$/.test(v),
      message: 'Phone number is invalid'
    }
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'receptionist', 'technician', 'other']
  },
  department: {
    type: String,
    required: true
  },
  schedule: {
    start: Date,
    end: Date,
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  },
  currentAppointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  availability: {
    status: {
      type: String,
      required: true,
      enum: ['available', 'busy', 'on_break', 'off_duty']
    },
    nextAvailable: {
      type: Date,
      validate: {
        validator: function(v: Date) {
          return v >= new Date();
        },
        message: 'Next available time must be in the future'
      }
    }
  },
  permissions: {
    readCitizenData: { type: Boolean, default: false },
    writeRequests: { type: Boolean, default: false },
    manageAppointments: { type: Boolean, default: false },
    emergencyAccess: { type: Boolean, default: false }
  },
  credentials: {
    lastLogin: Date,
    failedAttempts: { type: Number, default: 0 },
    lockedUntil: Date
  },
  emergencyAccess: {
    enabled: { type: Boolean, default: false },
    facialRecognition: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export const NewStaff =  mongoose.model<Staff>("Staff", StaffSchema);

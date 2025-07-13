import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface Citizen {
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
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    allergies: string[];
    emergencyContacts: {
      name: string;
      phone: string;
      relationship: string;
    }[];
  };
  administrativeRequests: string[];
  password: string;
}

export interface CitizenDocument extends Citizen, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const CitizenSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
      message: 'Email is invalid'
    }
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v: Date) {
        return v < new Date();
      },
      message: 'Birth date must be in the past'
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
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    // required: truef
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request',
    // required: true
  }],
  biometricData: {
    facialVector: {
      type: [Number],
      select: false,
      validate: {
        validator: function(v: number[]) {
          return v.length === 128;
        },
        message: 'Facial vector must be 128-dimensional'
      }
    }
  },
  emergencyProfile: {
    bloodType: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [String],
    emergencyContacts: [{
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: (v: string) => /^\+?[1-9]\d{1,14}$/.test(v),
          message: 'Phone number is invalid'
        }
      },
      relationship: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      }
    }]
  },
  administrativeRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Demande',
    // required: true
  }],
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 50
  }
}, {
  timestamps: true,
});

// Hash the password before saving
CitizenSchema.pre<CitizenDocument>('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

// Virtuals for populated fields
CitizenSchema.virtual('appointmentsDetails', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'citizen'
});

CitizenSchema.virtual('requestsDetails', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'citizen'
});

CitizenSchema.virtual('emergencyContactsDetails', {
  ref: 'Citizen',
  localField: 'emergencyProfile.emergencyContacts.phone',
  foreignField: 'phoneNumber'
});

CitizenSchema.virtual('administrativeRequestsDetails', {
  ref: 'Demande',
  localField: 'administrativeRequests',
  foreignField: '_id'
});

// Compare the given password with the stored hash
CitizenSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const NewCitizen =  mongoose.model<CitizenDocument>("Citizen", CitizenSchema);

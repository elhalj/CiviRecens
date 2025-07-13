import mongoose, { Document, Schema } from "mongoose";

export interface Appointment {
  citizen: string;
  institution: string;
  staff: string;
  type: 'consultation' | 'document_request' | 'emergency' | 'other';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledTime: Date;
  duration: number;
  location: {
    room: string;
    floor: string;
  };
  notes: string;
  reminders: {
    sent: boolean;
    method: 'email' | 'sms' | 'both';
    timestamp: Date;
  }[];
  emergencyAccess: {
    enabled: boolean;
    facialRecognition: boolean;
  };
}

export interface AppointmentDocument extends Appointment, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  citizen: {
    type: Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true,
    // validate: {
    //   validator: function(v: mongoose.Types.ObjectId) {
    //     return v.toString().length === 24;
    //   },
    //   message: 'Invalid citizen ID'
    // }
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: true,
    // validate: {
    //   validator: function(v: mongoose.Types.ObjectId) {
    //     return v.toString().length === 24;
    //   },
    //   message: 'Invalid institution ID'
    // }
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
    // validate: {
    //   validator: function(v: mongoose.Types.ObjectId) {
    //     return v.toString().length === 24;
    //   },
    //   message: 'Invalid staff ID'
    // }
  },
  type: {
    type: String,
    required: true,
    enum: ['consultation', 'document_request', 'emergency', 'other']
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'confirmed', 'completed', 'cancelled']
  },
  scheduledTime: {
    type: Date,
    required: true,
    validate: {
      validator: function(v: Date) {
        return v >= new Date();
      },
      message: 'Scheduled time must be in the future'
    }
  },
  duration: {
    type: Number,
    // required: true,
    default: 30,
    min: 15,
    max: 360
  },
  location: {
    room: {
      type: String,
    //   required: true,
      trim: true,
      maxlength: 50
    },
    floor: {
      type: String,
    //   required: true,
      trim: true,
      maxlength: 50
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  reminders: [{
    sent: { type: Boolean, default: false },
    method: {
      type: String,
      enum: ['email', 'sms', 'both']
    },
    timestamp: {
      type: Date,
    //   required: true,
      validate: {
        validator: function(v: Date) {
          return v >= new Date();
        },
        message: 'Reminder timestamp must be in the future'
      }
    }
  }],
  emergencyAccess: {
    enabled: { type: Boolean, default: false },
    facialRecognition: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
});

// Virtuals for populated fields
AppointmentSchema.virtual('citizenDetails', {
  ref: 'Citizen',
  localField: 'citizen',
  foreignField: '_id'
});

AppointmentSchema.virtual('institutionDetails', {
  ref: 'Institution',
  localField: 'institution',
  foreignField: '_id'
});

AppointmentSchema.virtual('staffDetails', {
  ref: 'Staff',
  localField: 'staff',
  foreignField: '_id'
});



export const NewAppointment =  mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);

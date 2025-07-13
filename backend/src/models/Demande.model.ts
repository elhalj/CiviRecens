import mongoose, { Document, Schema } from "mongoose";

export interface Demande {
  citizenId: string;
  institutionId: string;
  serviceId: string;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  adminId: string | null;
  adminName: string | null;
  adminEmail: string | null;
}

export interface DemandeDocument extends Demande, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const DemandeSchema: Schema = new Schema({
  citizenId: {
    type: Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true,
    validate: {
      validator: function(v: mongoose.Types.ObjectId) {
        return v.toString().length === 24;
      },
      message: 'Invalid citizen ID'
    }
  },
  institutionId: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: true,
    validate: {
      validator: function(v: mongoose.Types.ObjectId) {
        return v.toString().length === 24;
      },
      message: 'Invalid institution ID'
    }
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
    validate: {
      validator: function(v: mongoose.Types.ObjectId) {
        return v.toString().length === 24;
      },
      message: 'Invalid service ID'
    }
  },
  type: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  title: {
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
    maxlength: 1000
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'processing', 'completed', 'rejected']
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: false,
    default: null,
    validate: {
      validator: function(v: mongoose.Types.ObjectId | null) {
        if (v) {
          return v.toString().length === 24;
        }
        return true;
      },
      message: 'Invalid admin ID'
    }
  },
  adminName: {
    type: String,
    required: false,
    default: null,
    trim: true,
    maxlength: 100
  },
  adminEmail: {
    type: String,
    required: false,
    default: null,
    trim: true,
    validate: {
      validator: (v: string | null) => {
        if (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        }
        return true;
      },
      message: 'Invalid admin email'
    }
  }
}, {
  timestamps: true,
});

// Virtuals for populated fields
DemandeSchema.virtual('citizenDetails', {
  ref: 'Citizen',
  localField: 'citizenId',
  foreignField: '_id'
});

DemandeSchema.virtual('institutionDetails', {
  ref: 'Institution',
  localField: 'institutionId',
  foreignField: '_id'
});

DemandeSchema.virtual('serviceDetails', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id'
});

DemandeSchema.virtual('adminDetails', {
  ref: 'Staff',
  localField: 'adminId',
  foreignField: '_id'
});

export const NewDemande =  mongoose.model<DemandeDocument>("Demande", DemandeSchema);

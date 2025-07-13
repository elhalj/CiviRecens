import { ObjectId } from 'mongodb';

export const validateObjectId = (id: string): boolean => {
  if (!id) return false;
  return ObjectId.isValid(id);
};

export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name: string): boolean => {
  if (!name) return false;
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

export const validateDate = (date: Date | string): boolean => {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const validateBloodType = (bloodType: string): boolean => {
  const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validBloodTypes.includes(bloodType);
};

export const validateFacialVector = (vector: number[]): boolean => {
  if (!vector || !Array.isArray(vector)) return false;
  return vector.length === 128;
};

export const validateEnum = <T>(value: string, enumValues: T[]): boolean => {
  return enumValues.includes(value as unknown as T);
};

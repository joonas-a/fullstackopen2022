import data from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientEntry, NonSensitivePatient } from '../types';

const getEntries = (): Array<NonSensitivePatient> => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string) => {
  const patient = data.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Patient with given ID not found!');
  }
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  };
  data.push(newPatient);
  return newPatient;
};

export default { getEntries, getPatient, addPatient };

import data from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PatientPreview, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientPreview> => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  };
  data.push(newPatient);
  return newPatient;
};

export default { getEntries, addPatient };

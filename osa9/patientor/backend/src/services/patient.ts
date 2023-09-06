import data from '../../data/patients';
import { PatientPreview } from '../types';

const getEntries = (): Array<PatientPreview> => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getEntries };

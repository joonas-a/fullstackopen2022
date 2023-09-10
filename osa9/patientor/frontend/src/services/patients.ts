import axios from 'axios';
import {
  Patient,
  FetchedPatient,
  PatientFormValues,
  EntryWithoutId,
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getSingle = async (id: string) => {
  const { data } = await axios.get<FetchedPatient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (object: EntryWithoutId, id: string) => {
  const { data } = await axios.post<FetchedPatient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getSingle,
  create,
  addEntry,
};

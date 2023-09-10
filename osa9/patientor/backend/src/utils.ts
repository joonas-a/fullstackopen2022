import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  NewOccupationalHealthcareEntry,
  Diagnose,
  NewHealthCheckEntry,
  HealthCheckRating,
  NewHospitalEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Please fill every field');
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseHealthCheck = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || rating > 3 || rating < 0) {
    throw new Error('Incorrect or missing health rating');
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data malformatted');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseText(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseText(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
      entries: [],
    };
    return newEntry;
  }
  throw new Error('Some of the fields were empty');
};

const newOccupationalHealthcare = (object: any): EntryWithoutId => {
  if (!object.employerName) {
    throw new Error('Employer name missing');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'employerName' in object
  ) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseText(object.description),
      date: parseDate(object.date),
      specialist: parseText(object.specialist),
      employerName: parseText(object.employerName),
      type: 'OccupationalHealthcare',
      sickLeave: {
        startDate: parseDate(object.sickLeave?.startDate),
        endDate: parseDate(object.sickLeave?.endDate),
      },
      diagnosisCodes: parseDiagnosisCodes(object),
    };
    return newEntry;
  }
  throw new Error('missing params');
};

const newHealthCheck = (object: any): EntryWithoutId => {
  if (!object.healthCheckRating) {
    throw new Error('Health check rating missing');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'healthCheckRating' in object
  ) {
    const newEntry: NewHealthCheckEntry = {
      description: parseText(object.description),
      date: parseDate(object.date),
      specialist: parseText(object.specialist),
      healthCheckRating: parseHealthCheck(object.healthCheckRating),
      type: 'HealthCheck',
      diagnosisCodes: parseDiagnosisCodes(object),
    };
    return newEntry;
  }
  throw new Error('Missing params');
};

const newHospital = (object: any): EntryWithoutId => {
  if (!object.discharge) {
    throw new Error('Discharge information missinge');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'discharge' in object
  ) {
    const newEntry: NewHospitalEntry = {
      description: parseText(object.description),
      date: parseDate(object.date),
      specialist: parseText(object.specialist),
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseText(object.discharge.criteria),
      },
      type: 'Hospital',
      diagnosisCodes: parseDiagnosisCodes(object),
    };
    return newEntry;
  }
  throw new Error('Missing params');
};

export const toNewDiagnosis = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data malformatted');
  }
  if (!('type' in object)) {
    throw new Error('Diagnosis is missing a type');
  }

  switch (object.type) {
    case 'OccupationalHealthcare':
      return newOccupationalHealthcare(object);
    case 'HealthCheck':
      return newHealthCheck(object);
    case 'Hospital':
      return newHospital(object);
    default:
      throw new Error('Unknown diagnosis type!');
  }
};

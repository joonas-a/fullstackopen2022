import express from 'express';
import patientService from '../services/patient';
import { toNewDiagnosis, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(404).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewDiagnosis(req.body);
    const patientId = req.params.id;
    const updatedPatient = patientService.addNewDiagnose(patientId, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  FetchedPatient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import NewEntryModal from './AddEntryModal/index';
import axios from 'axios';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<FetchedPatient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      patientService
        .getSingle(id)
        .then((res) => setPatient(res))
        .catch((e) => {
          if (e instanceof Error) {
            console.error(e);
            setError(e.message);
          }
        });
      diagnosisService
        .getAll()
        .then((res) => setDiagnosis(res))
        .catch((e) => {
          if (e instanceof Error) {
            console.error(e);
            setError(e.message);
          }
        });
    }
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setModalError('');
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) throw new Error('Invalid ID');
    try {
      const entry = await patientService.addEntry(values, id);
      closeModal();
      setPatient(entry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e.response.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setModalError(message);
        } else {
          setModalError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error');
        setModalError('Unknown error');
      }
    }
  };

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!patient) {
    return <></>;
  }

  if (!id) {
    return <h3>Loading..</h3>;
  }

  return (
    <div>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">{patient.name}</Typography>
        <Typography>Gender: {patient.gender}</Typography>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography variant="h5">Entries:</Typography>
        <NewEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={modalError}
          id={id}
          diagnosis={diagnosis}
        />
        <Button variant="contained" onClick={() => openModal()}>
          New Entry
        </Button>
        {patient.entries.length > 0 && (
          <div>
            {patient.entries.map((entry) => (
              <div key={entry.id}>
                <Box
                  sx={{
                    mt: 1,
                    border: 2,
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  {EntryDetails(entry)}
                  {DiagnoseCodes(entry, diagnosis)}
                </Box>
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return HospitalView(entry);
    case 'HealthCheck':
      return HealthCheckView(entry);
    case 'OccupationalHealthcare':
      return OccupationalHealthcareView(entry);
    default:
      return assertNever(entry);
  }
};

const DiagnoseCodes = (entry: Entry, diagnosis: Diagnosis[]) => {
  if (!entry.diagnosisCodes) {
    return <></>;
  }
  return (
    <>
      {entry.diagnosisCodes.map((code, idx) => {
        const diagnosisMatch = diagnosis.find((item) => item.code === code);

        return (
          <Typography sx={{ mt: 1 }} key={idx} variant="body2">
            <li>
              {code} {diagnosisMatch?.name}
            </li>
          </Typography>
        );
      })}
    </>
  );
};

const HospitalView = (entry: HospitalEntry) => {
  return (
    <>
      <HealingOutlinedIcon />
      <br />
      <Typography>
        {entry.date}
        <br />
        {entry.description}
        <br />
        Discharge criteria: {entry.discharge.criteria}
        <br />
        Discharge date: {entry.discharge.date}
      </Typography>
      <Typography variant="body2">Diagnose by {entry.specialist}</Typography>
    </>
  );
};
const HealthCheckView = (entry: HealthCheckEntry) => {
  return (
    <>
      <LocalHospitalOutlinedIcon />
      <br />
      <Typography>
        {entry.date}
        <br />
        {entry.description}
        <br />
        Risk group: {entry.healthCheckRating}
      </Typography>
      <Typography variant="body2">Diagnose by {entry.specialist}</Typography>
    </>
  );
};
const OccupationalHealthcareView = (entry: OccupationalHealthcareEntry) => {
  return (
    <>
      <VaccinesOutlinedIcon />
      <br />
      <Typography variant="h6">{entry.date}</Typography>
      <Typography sx={{ mt: -2 }}>
        <br />
        {entry.description}
        <br />
        Employer: {entry.employerName}
        <br />
        {entry.sickLeave && (
          <span>
            Sick leave start: {entry.sickLeave?.startDate}
            <br />
            Sick leave end: {entry.sickLeave.endDate}
          </span>
        )}
      </Typography>
      <Typography variant="body2">Diagnose by {entry.specialist}</Typography>
    </>
  );
};

export default PatientInfoPage;

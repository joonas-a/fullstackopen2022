import { FetchedPatient } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<FetchedPatient | null>(null);
  const [error, setError] = useState('');

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
    }
  }, [id]);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!patient) {
    return <></>;
  }

  return (
    <div>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">{patient.name}</Typography>
        <Typography>Gender: {patient.gender}</Typography>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        {patient.entries.length > 0 && (
          <div>
            <Typography variant="h5">Entries:</Typography>
            {patient.entries.map((entry) => (
              <div key={entry.id}>
                <Typography>
                  {entry.date} {entry.description}
                </Typography>
                {entry.diagnosisCodes?.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};
export default PatientInfoPage;

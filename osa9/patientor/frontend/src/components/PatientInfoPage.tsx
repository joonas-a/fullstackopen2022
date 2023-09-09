import { Diagnosis, FetchedPatient } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnosis';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<FetchedPatient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
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
                <Typography sx={{ mb: 1 }}>
                  {entry.date} {entry.description}
                </Typography>
                {entry.diagnosisCodes?.map((code, idx) => {
                  const diagnosisMatch = diagnosis.find(
                    (item) => item.code === code
                  );

                  return (
                    <li key={idx}>
                      {code} {diagnosisMatch?.name}
                    </li>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};
export default PatientInfoPage;

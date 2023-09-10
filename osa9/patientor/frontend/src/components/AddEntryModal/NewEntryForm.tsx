import {
  Box,
  Button,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from '../../types';
import { SyntheticEvent, useState } from 'react';

interface FormProps {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  id: Patient['id'];
  diagnosis: Diagnosis[];
}

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

type FormTypeProp = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeaveProp {
  startDate: string;
  endDate: string;
}

const ratingOptions: RatingOption[] = Object.keys(HealthCheckRating).map(
  (key) => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    label: key,
  })
);

const NewEntryForm = ({ onSubmit, onCancel, id, diagnosis }: FormProps) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [codes, setCodes] = useState<Diagnosis['code'][]>([]);
  const [formType, setFormType] = useState<FormTypeProp>('HealthCheck');
  const [discharge, setDischarge] = useState<Discharge>({
    criteria: '',
    date: '',
  });
  const [employer, setEmployer] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeaveProp>({
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let entryObj;

    switch (formType) {
      case 'HealthCheck':
        entryObj = {
          type: formType,
          description,
          date,
          specialist,
          healthCheckRating: rating,
          diagnosisCodes: codes,
        };
        break;
      case 'Hospital':
        entryObj = {
          type: formType,
          description,
          date,
          specialist,
          discharge,
          diagnosisCodes: codes,
        };
        break;
      case 'OccupationalHealthcare':
        entryObj = {
          type: formType,
          description,
          date,
          specialist,
          employerName: employer,
          diagnosisCodes: codes,
        };
        if (sickLeave.endDate !== '' && sickLeave.startDate !== '') {
          entryObj = {
            ...entryObj,
            sickLeave,
          };
        }
        break;
      default:
        throw new Error('Type has not been set properly');
    }
    onSubmit(entryObj);
    return;
  };

  const onCodeChange = (event: SelectChangeEvent<typeof codes>) => {
    const value = event.target.value;
    setCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if (typeof event.target.value === 'string') {
      const value = parseInt(event.target.value);

      const newValue = Object.values(HealthCheckRating).find(
        (v) => v === value
      );

      if (newValue !== undefined && typeof newValue !== 'string') {
        setRating(newValue);
      }
    }
  };

  const onFormChange = (event: SelectChangeEvent<string>): void => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      if (
        value === 'HealthCheck' ||
        value === 'OccupationalHealthcare' ||
        value === 'Hospital'
      ) {
        setFormType(value);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputLabel>Entry type</InputLabel>
        <Select fullWidth label="Type" value={formType} onChange={onFormChange}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
        <TextField
          sx={{ mt: 1 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel>Date</InputLabel>
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {formType === 'HealthCheck' && (
          <>
            <InputLabel id="healthcheck" sx={{ mt: 2 }}>
              HealthCheck rating
            </InputLabel>
            <Select
              fullWidth
              labelId="healthcheck"
              value={rating.toString()}
              onChange={onRatingChange}
            >
              {ratingOptions
                .filter((option) => typeof option.value !== 'string')
                .map((option) => (
                  <MenuItem key={option.label} value={option.value.toString()}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
        {formType === 'Hospital' && (
          <>
            <InputLabel>Discharge date</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={discharge.date}
              onChange={({ target }) =>
                setDischarge({
                  criteria: discharge.criteria,
                  date: target.value,
                })
              }
            />
            <TextField
              sx={{ mt: 1 }}
              label="Discharge criteria"
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) =>
                setDischarge({ criteria: target.value, date: discharge.date })
              }
            />
          </>
        )}
        {formType === 'OccupationalHealthcare' && (
          <>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              value={employer}
              label="Employer name"
              onChange={({ target }) => setEmployer(target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel>Sick leave start</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={sickLeave.startDate}
                  onChange={({ target }) =>
                    setSickLeave({
                      startDate: target.value,
                      endDate: sickLeave.endDate,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Sick leave end</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={sickLeave.endDate}
                  onChange={({ target }) =>
                    setSickLeave({
                      startDate: sickLeave.startDate,
                      endDate: target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </>
        )}

        <InputLabel id="diagnosis">Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={codes}
          onChange={onCodeChange}
          labelId="diagnosis"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnosis.map((diagnose, idx) => (
            <MenuItem key={idx} value={diagnose.code}>
              {diagnose.code} {diagnose.name}
            </MenuItem>
          ))}
        </Select>

        <Grid sx={{ mt: 1, mb: 8 }}>
          <Grid item>
            <Button sx={{ float: 'left' }} type="submit" variant="contained">
              Add
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ float: 'left' }}
              variant="outlined"
              color="secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewEntryForm;

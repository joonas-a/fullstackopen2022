import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';

import NewEntryForm from './NewEntryForm';
import { Diagnosis, EntryWithoutId } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  id: string;
  diagnosis: Diagnosis[];
}

const NewEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  id,
  diagnosis,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <NewEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        id={id}
        diagnosis={diagnosis}
      />
    </DialogContent>
  </Dialog>
);

export default NewEntryModal;

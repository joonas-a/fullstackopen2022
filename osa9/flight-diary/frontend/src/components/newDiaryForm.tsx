import { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { DiaryEntry } from '../types';
import axios from 'axios';
import Notification from './notification';

const NewDiaryForm = ({
  updateDiaries,
}: {
  updateDiaries: (diary: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState('');
  const [notification, setNotification] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const resetForm = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  const notify = (notification: string) => {
    setNotification(notification);
    setTimeout(() => setNotification(''), 5000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary = await createDiary({
        date,
        visibility,
        weather,
        comment,
      });
      resetForm();
      updateDiaries(newDiary);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(error.response);
          notify(error.response.data);
        } else {
          notify('Unknown error');
        }
      } else {
        notify('Unknown error');
      }
    }
  };
  return (
    <div>
      <h2>Add new Entry</h2>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        date:
        <input
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        Visibility:
        <input
          type="text"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        Weather:
        <input
          type="text"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />
        Comment:
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;

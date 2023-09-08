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
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        Visibility:
        <input
          type="radio"
          id="great"
          value="great"
          name="visibility"
          onChange={() => setVisibility('great')}
        />
        <label htmlFor="great">great</label>
        <input
          type="radio"
          id="good"
          value="good"
          name="visibility"
          onChange={() => setVisibility('good')}
        />
        <label htmlFor="good">good</label>
        <input
          type="radio"
          id="ok"
          value="ok"
          name="visibility"
          onChange={() => setVisibility('ok')}
        />
        <label htmlFor="ok">ok</label>
        <input
          type="radio"
          id="poor"
          value="poor"
          name="visibility"
          onChange={() => setVisibility('poor')}
        />
        <label htmlFor="poor">poor</label>
        <br />
        Weather:
        <input
          type="radio"
          id="sunny"
          value="sunny"
          name="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="sunny">sunny</label>
        <input
          type="radio"
          id="rainy"
          value="rainy"
          name="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="rainy">rainy</label>
        <input
          type="radio"
          id="cloudy"
          value="cloudy"
          name="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input
          type="radio"
          id="stormy"
          value="stormy"
          name="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="stormy">stormy</label>
        <input
          type="radio"
          id="windy"
          value="windy"
          name="weather"
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="windy">windy</label>
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

import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryList from './components/diaryList';
import NewDiaryForm from './components/newDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const updateDiaries = (obj: DiaryEntry) => {
    setDiaries(diaries.concat(obj));
  };

  return (
    <div>
      <NewDiaryForm updateDiaries={updateDiaries} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;

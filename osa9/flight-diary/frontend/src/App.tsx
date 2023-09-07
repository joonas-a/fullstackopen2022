import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryList from './components/diaryList';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
      console.log(diaries);
    });
  }, []);

  return (
    <>
      <div>
        <DiaryList diaries={diaries} />
      </div>
    </>
  );
};

export default App;

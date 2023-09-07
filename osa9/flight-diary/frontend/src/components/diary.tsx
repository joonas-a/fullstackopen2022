import { DiaryEntry } from '../types';

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <p>
        <strong>{diary.date}</strong>
      </p>
      Visibility: {diary.visibility}
      <br />
      Weather: {diary.weather}
    </div>
  );
};

export default Diary;

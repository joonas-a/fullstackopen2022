import { DiaryEntry } from '../types';
import Diary from './diary';

const DiaryList = (props: { diaries: Array<DiaryEntry> }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map((diary, id) => (
        <div key={id}>
          <Diary diary={diary} />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;

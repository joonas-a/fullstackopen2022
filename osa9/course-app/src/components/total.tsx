import { CoursePart } from '../types';

const Total = (props: { courses: Array<CoursePart> }) => {
  return (
    <p>
      Number of exercises{' '}
      {props.courses.reduce((acc, cur) => acc + cur.exerciseCount, 0)}
    </p>
  );
};

export default Total;

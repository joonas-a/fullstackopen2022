import Part from './Part';
import { CoursePart } from '../types';

const Content = (props: { courses: Array<CoursePart> }) => {
  return (
    <div>
      {props.courses.map((course) => (
        <div key={course.name}>
          <Part part={course} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;

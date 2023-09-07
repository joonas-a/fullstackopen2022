import { CourseList } from '../types';

const Content = (props: { courses: CourseList }) => {
  return (
    <div>
      {props.courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;

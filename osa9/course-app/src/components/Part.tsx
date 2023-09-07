import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
        </div>
      );
    case 'background':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <br />
          {part.backgroundMaterial}
        </div>
      );
    case 'group':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>Project exercises {part.groupProjectCount}</i>
        </div>
      );
    case 'special':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <br />
          Required skills:
          {part.requirements.map((req, idx) => (
            <span key={idx}> {req}</span>
          ))}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;

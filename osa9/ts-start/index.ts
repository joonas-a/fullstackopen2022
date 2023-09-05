import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query;
  const height = Number(query.height);
  const weight = Number(query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'invalid parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    res.status(200).json({ weight: weight, height: height, bmi: bmi });
  }
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || !req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onlyNumbers(args: any): boolean {
    if (Array.isArray(args)) {
      return args.every((item) => typeof item === 'number');
    }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || !onlyNumbers(daily_exercises)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const params: number[] = [Number(target), ...daily_exercises];

  const result = calculateExercises(params);

  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

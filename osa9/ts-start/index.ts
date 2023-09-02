import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

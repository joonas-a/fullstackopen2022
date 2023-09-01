const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000

  console.log(bmi)

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal'
  } else if (bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30) {
    return 'Obese'
  } else {
    return 'Invalid input'
  }
}
console.log(calculateBmi(180, 74))

import { parseArguments } from './argParser'

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000

  // console.log(bmi)

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

try {
  const args = parseArguments(process.argv, 2)
  console.log(calculateBmi(args[0], args[1]))
} catch (error: unknown) {
  let errorMsg
  if (error instanceof Error) {
    errorMsg = 'Error: ' + error.message
  }
  console.log(errorMsg)
}

/* test with:
npm run calculateBmi 180 91
*/

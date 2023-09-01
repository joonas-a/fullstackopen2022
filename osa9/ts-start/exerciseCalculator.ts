import { parseArguments } from './argParser'

interface statistics {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (args: number[]): statistics => {
  const target = args.shift()
  const periodLength = args.length
  const trainingDays = args.filter((val) => val !== 0).length
  const average =
    args.reduce((acc, cur) => {
      return acc + cur
    }, 0) / periodLength
  const success = average >= target

  let rating
  let ratingDescription

  if (average < target - 0.5) {
    rating = 1
    ratingDescription = 'Not good'
  } else if (average > target + 0.5) {
    rating = 3
    ratingDescription = 'Very good'
  } else {
    rating = 2
    ratingDescription = 'Good'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const args = parseArguments(process.argv, 0)
  console.log(calculateExercises(args))
} catch (error: unknown) {
  let errorMsg
  if (error instanceof Error) {
    errorMsg = 'Error: ' + error.message
  }
  console.log(errorMsg)
}

/* test with:
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
*/

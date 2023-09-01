interface statistics {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (args: number[], target: number): statistics => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

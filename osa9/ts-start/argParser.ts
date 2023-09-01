/*
Limit for max number of arguments
Set to 0 for no restrictions
*/

export const parseArguments = (args: string[], limit: number): number[] => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (limit !== 0 && args.length > 2 + limit)
    throw new Error('Too many elements')
  let response = []
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided arguments were not numbers!')
    }
    response.push(Number(args[i]))
  }
  return response
}

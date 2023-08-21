const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer

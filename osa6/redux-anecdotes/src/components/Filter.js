import { updateFilter } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()
    dispatch(updateFilter(event.target.value))
  }
  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter

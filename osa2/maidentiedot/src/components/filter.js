const Filter = ({ searchTerm, handler }) => {
  return (
    <p>
      Search for a country: <input value={searchTerm} onChange={handler} />
    </p>
  )
}

export default Filter

const Filter = ({ searchTerm, handler }) => {
  return (
    <p>
      search for: <input value={searchTerm} onChange={handler} />
    </p>
  )
}

export default Filter

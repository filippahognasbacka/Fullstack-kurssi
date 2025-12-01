const Filter = ({ filterStr, onChange }) => {
  return (
    <div>
      filter shown with <input value={filterStr} onChange={onChange}/>
    </div>
  )
}

export default Filter;


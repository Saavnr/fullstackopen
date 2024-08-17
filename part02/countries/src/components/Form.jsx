const Form = ({handleSubmit, handleValueChange, value}) => {
  return (
    <form onSubmit={handleSubmit}>
      Find countries: <input type="text" value={value} onChange={handleValueChange} />
    </form>
  )
}

export default Form
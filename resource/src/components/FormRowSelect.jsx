const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}) => {
  if(name == "userId"){
    console.log("came")
    let userNames = [];
    userslist();

  const userslist = async () => {
    try {
      const { data } = await customFetch.get('/users').then(data=>{
        console.log("list:" ,data);
       
          userNames = value.data.map(x=> x.name)
          console.log("came1")
          list = [...new Set(userNames)]
          console.log(list)
        });
    } catch (error) {
      console.log(error);
    }
  };

   
  }
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return ( 
            <option key={itemValue} value={itemValue}>
              {itemValue.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;

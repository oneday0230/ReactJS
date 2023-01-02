import { useState } from "react";

function App() 
{
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value},
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value); // submit 버튼 클릭시 콘솔에 보여준다.
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder="username"></input>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default App;

// git test
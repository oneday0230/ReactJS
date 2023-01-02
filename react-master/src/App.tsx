import { useState } from "react";

function App() 
{
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value},   //// const value = event.currentTarget.value 와 같은 코드 (여러 event를 가져올 때 유용하다 아래 주석 참조)
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value); //// submit 버튼 클릭시 콘솔에 보여준다.
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


/*
const value = event.currentTarget.value;
const tagName = event.currentTarget.tagName;
const width = event.currentTarget.width;
const id = event.currentTarget.id;

위 코드를 아래처럼 작성 가능/

const {
currentTarget: {value, tagName, width, id}
} = event;
*/
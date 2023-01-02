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
// 위 코드를 아래처럼 작성 가능

const {
currentTarget: {value, tagName, width, id}
} = event;

// 이렇게도 작성 가능
const { value } = event.currentTarget;

// 추가로 event 안에 있는 속성만 가져와 변수를 만들려고 한다면 아래 처럼 작성 하면 된다.
const { x, y } = event; 


https://reactjs.org/docs/events.html
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
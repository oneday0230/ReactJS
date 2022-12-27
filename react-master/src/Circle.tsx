import styled from "styled-components"

interface ContainerProps {
    bgColor: string;
}

//styled-components는 다른 props를 가지므로 interface를 추가하여 `<ContainerProps>`와 같이 type을 설정해주면 error가 발생하지 않는다.
const Container =styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
`;

interface CircleProps {
    bgColor: string;
}

//interface를 추가한 후 아래 처럼 type을 `CircleProps`로 설정해주면 TypeScript는 CircleProps안에 bgColor가 있다는 걸 알게 된다.
function Circle({bgColor}: CircleProps)
{
    return <Container bgColor={bgColor}></Container>
}

export default Circle;

// TypeScript와 코드가 실행되기 전에 확인해주므로 에러를 쉽게 확인 할 수 있다.
interface PlayerShape {
    name: string;
    age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`

sayHello({name: 'Kate', age: 30});
sayHello({name: 'Jane', age: 28, countey: 'us'}) //[Error] Argument of type '{ name: string; age: number; countey: string; }' is not assignable to parameter of type 'PlayerShape'. Object literal may only specify known properties, and 'countey' does not exist in type 'PlayerShape'.ts(2345)

//git test
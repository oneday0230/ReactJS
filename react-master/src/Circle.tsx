import { useState } from "react";
import styled from "styled-components"

interface ContainerProps {
    bgColor: string;
    borderColor: string;
    text?: string;
}

//styled-components는 다른 props를 가지므로 interface를 추가하여 `<ContainerProps>`와 같이 type을 설정해주면 error가 발생하지 않는다.
const Container =styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 2px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string; // ?를 추가하면 undefined 값도 가질 수 있는 optional 상태가 된다. ( = borderColor: string | undefined)
    text?: string;
}

//interface를 추가한 후 아래 처럼 type을 `CircleProps`로 설정해주면 TypeScript는 CircleProps안에 bgColor가 있다는 걸 알게 된다.
function Circle({bgColor, borderColor, text = "defualt text"}: CircleProps)
{
    // `borderColor ?? bgColor`는 borderColor가 undefined 된 상태면 bgColor와 같은 값을 갖는다 것 (?? = nullish coalescing)
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>
}

export default Circle;
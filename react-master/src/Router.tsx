import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() 
{
    return (
    <BrowserRouter>
        <Switch>
            {/* Router URL이 변수값(:coinId)을 갖게 된다. -> ex) /test 로 주소 입력시 'test'를 params(coinId: "test")로 받을 수 있다.*/}
            <Route path="/:coinId"> 
                <Coin></Coin>
            </Route>
            {/* 기본 router */}
            <Route path="/">
                <Coins></Coins>
            </Route>
        </Switch>   
    </BrowserRouter>
    );
}

export default Router;



// React Router 설치 버전 :  npm i react-router-dom@5.3.0 
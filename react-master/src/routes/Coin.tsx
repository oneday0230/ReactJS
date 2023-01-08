import { useLocation, useParams } from "react-router-dom";
import {Container, Header, Title, Loader} from "./Coins";
import { useEffect, useState } from "react";

interface RouteParams {
    coinId: string;
}
interface RouteState {
    name: string;
}

function Coin() 
{
    const { coinId } = useParams<RouteParams>();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation<RouteState>();

    return (
        <Container>
        <Header>
            <Title>{state?.name || 'Loading...'}</Title>
        </Header>
        { loading ? (<Loader>Loading...</Loader>) : null }
    </Container>
    )
}

export default Coin;
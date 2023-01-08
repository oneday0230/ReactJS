import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;
const Title = styled.h1`
    font-size: 48px;
    margin: 40px 0;
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.div`
    text-align: center;
    margin-top: 60px;
`;
const CoinsList = styled.ul`
`;
const Coin = styled.li`
   background-color: white;
   color: ${props => props.theme.bgColor};
   margin-bottom: 10px;
   border-radius: 10px;
   a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
   }
   &:hover {
    a {
        color: ${props => props.theme.accentColor};
    }
   }
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

function Coins()
{
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    // UseEffect를 사용하면 특정 시점에 코드를 실행시킬 수 있다.
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");   //  coin 정보를 가져오는 api
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();   
        // ()를 바로 붙이면 함수를 바로 실행시킬 수 있다.
    }, [])
    return (
        <Container>
            <Header>
                <Title>Coin</Title>
            </Header>
            {
                loading ? (<Loader>Loading...</Loader>) : (
                    <CoinsList>
                        {coins.map(coin => (
                            <Coin key={coin.id}>
                                <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )
            }
        </Container>
    );
}

export default Coins;
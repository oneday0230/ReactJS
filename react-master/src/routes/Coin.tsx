import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { Container, Header, Title, Loader } from "./Coins";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 16px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    opacity: 0.6;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.2;
  padding: 12px;
  text-align: center;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActivce: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 16px 0px;
  border-radius: 10px;
  color: ${props => props.isActivce ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const chartMatch = useRouteMatch("/:coinId/chart");   // 해당 Url에 있다면 useRouteMatch가 알려준다.
  const priceMatch = useRouteMatch("/:coinId/price"); 

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); // []에 coinId를 추가하면 coinId가 변할 때 마다 위 코드들이 다시 실행 된다. (다만 coinId는 바뀌는 값이 아니기 때문에 Request는 한번만 이루어 진다.)

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActivce={chartMatch !== null}>
              {/* a 태그 대신 Link를 사용하여 다른 화면은 re-rendering 되지 않도록 처리했다. */}
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActivce={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/* Tabs -> Route 설정하여 주소로 각 tab page에 접근할 수 있도록 했다.*/}
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price></Price>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart></Chart>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};  

export type Coin = {
    name: string;
    symbol: string;
    price: number;
    market_cap: number;
    volume_24h: number;
    percent_change_24h: number;
}
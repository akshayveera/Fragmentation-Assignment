
const useCoinData = ()=>{

    const [data, setData] = useState<any>({});
    
    useEffect(() => {
        CoinGeckoApi.fetchCoinData()
            .then((data: any) => {
            //console.log("coin stats", data);
            setCoinData(data?.market_data);
            })
            .catch((err) => {
            console.log(err);
            });
    }, []);

    return data;
}

export default useCoinData;
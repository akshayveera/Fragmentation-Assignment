import DashboardLayoutStyled from "./components/DashboardLayoutStyled";
import useCoinData from "./hooks/useCoinData";
import useExecuteBurn from "./hooks/useExecuteBurn";
import useRefetchTransactions from "./hooks/useRefetchTransactions";
import useSetBurnTransactions from "./hooks/useSetBurnTransactions";

const BurnPageStyled = styled.div``;

enum BurnTxProgress {
  default = "Burn App Tokens",
  burning = "Burning...",
}

export const BurnPage = () => {
  

  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } = useChainSelector();

  const { chains: receiveChains } = useWallet();

  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
  } = useAppSupplies(true);

  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const [isOldToken, setIsOldToken] = useState(false);
  const [burnAmount, setBurnAmount] = useState("");
  const { toastMsg, toastSev, showToast } = useAppToast();

  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });

  const [txButton, setTxButton] = useState<BurnTxProgress>(
    BurnTxProgress.default
  );
  
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const [approveTxHash, setApproveTxHash] = useState<string | null>(null);
  

  const statsSupplies = supplies;
  const tokenAddress = fetchAddressForChain(
    suppliesChain?.id,
    isOldToken ? "oldToken" : "newToken"
  );

  // added hook
  const coinData = useCoinData();  

  const onChangeBurnAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") setBurnAmount("");
    if (isNaN(parseFloat(e.target.value))) return;
    setBurnAmount(e.target.value);
  };

  // added hook
  const refetchTransactions = useRefetchTransactions(setBurnTransactions);

  // added hook
  const executeBurn = useExecuteBurn(openConnectModal, showToast, setTxButton, setTxProgress,  );

  useEffect(() => {
    if (!walletChain) return;
    //console.log(suppliesChain);
    let isSubscribed = true;
    // const newTokenAddress = fetchAddressForChain(
    //   walletChain?.id,
    //   isOldToken ? "oldToken" : "newToken"
    // );
    if (isSubscribed) setBurnTransactions([]);
    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects: any[] = [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];

    // added hook
    useSetBurnTransactions();

    return () => {
      isSubscribed = false;
    };
    
  }, [walletChain, isOldToken]);

  return (
    <div>
      <DashdboardLayoutStyled className="burnpage"/>

      <TransactionTableStyled>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>
        <BurnTxTable
          data={burnTransactions}
          priceUSD={coinData?.current_price?.usd}
        />
      </TransactionTableStyled>

      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
};

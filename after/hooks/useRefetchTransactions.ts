
const useRefetchTransactions = (setBurnTransactions)=>{

    return ()=>{
        Promise.all(
            ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
          )
            .then((results: any) => {
              //console.log(res);
              let res = results.flat();
              res = ChainScanner.sortOnlyBurnTransactions(res);
              res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
              setBurnTransactions(res);
            })
            .catch((err) => {
              console.log(err);
            });
    }
}

export default useRefetchTransactions;

const useExecuteBurn = (openConnectModal: ()=>void, showToast : ()=>void, setTxButton : ()=> void , setTxProgress : ()=> void, burnAmount: string, refetchTransactions:()=>void, fetchSupplies:()=>void)=>{

    return async ()=>{

        if (!isWalletConnected) {
            openConnectModal();
          }
          if (burnAmount === "") {
            console.log("Enter amount to migrate");
            showToast("Enter amount to migrate", ToastSeverity.warning);
            return;
          }
          const newTokenAddress = fetchAddressForChain(walletChain?.id, "newToken");
          const oftTokenContract = new Contract(
            newTokenAddress,
            oftAbi,
            ethersSigner
          );
          let amount = parseEther(burnAmount);
          setTxButton(BurnTxProgress.burning);
          setTxProgress(true);
          try {
            const burnTx = await oftTokenContract.burn(
              //tokenAddress,
              amount
            );
            setBurnTxHash(burnTx.hash);
            console.log(burnTx, burnTx.hash);
            await burnTx.wait();
            setTxButton(BurnTxProgress.default);
            setTxProgress(false);
            refetchTransactions();
            fetchSupplies();
          } catch (err) {
            console.log(err);
            setTxButton(BurnTxProgress.default);
            setTxProgress(false);
            showToast("Burn Failed!", ToastSeverity.error);
            return;
          }

    }
}

export default useExecuteBurn;
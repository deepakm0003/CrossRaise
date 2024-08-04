const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask first!");
    }
  };
  
  window.connectWallet = connectWallet;
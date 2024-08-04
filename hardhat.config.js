// https://eth-mainnet.g.alchemy.com/v2/0abOw-Kl5TfVMxljDGIPL9LzkRLhEv2s

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity :'0.8.4',
  networks:{
    Mainnet:{
      url:'https://eth-mainnet.g.alchemy.com/v2/0abOw-Kl5TfVMxljDGIPL9LzkRLhEv2s',
      accounts:[ '8d55446eb73cce0770414df6d15fa660c797a2d4a15b267814d3f30c661ad2e8' ]
    }

  }
}
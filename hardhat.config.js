require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");


module.exports = {
    solidity: "0.8.9",
    networks: {
      hardhat: {
        chainId: 1337,
      },
    },
  };
# Proxy Smart Contract
This project showcases the implementation of a proxy smart contract using the OpenZeppelin Proxy pattern. The proxy contract acts as a transparent intermediary between users and the implementation contract, allowing for seamless upgrades and maintenance without disrupting the contract's functionality or user interactions.

This project consists of two Solidity contracts, **NUM1** and **NUM2**, which demonstrate contract deployment and upgrading using the Hardhat framework and OpenZeppelin's upgradeable contracts.


## Contracts
### NUM1
The **NUM1** contract is a basic contract with a private `num` variable. It provides two functions:

* `update(uint256 _num)`: Updates the num variable with the given value.
* `get()`: Retrieves the current value of the num variable.
### NUM2
The **NUM2** contract extends the functionality of NUM1 by adding an additional function:

* `increment()`: Increments the value of the num variable by 1.

## How to do upgrade in Smart Contract ?
* Smart Contract deployed using **OpenZeppelin Upgrades Plugin** can be upgraded to modify their code, while **preserving their address, state, and balance.**
* This allow you to iteratively add new features to your project, or fix any bugs and you may find in production.
* **deployProxy in the OpenZeppelin Upgrades Plugin.

## Prerequisites

Before you can run the tests, make sure you have the following installed:

- Node.js
- Hardhat
- OpenZeppelin

## Installation

1. For Hardhat Installation
``` 
npm init --yes
npm install --save-dev hardhat
```

2. For running hardhat sample project install these dependencies:
```
npm install --save-dev @nomiclabs/hardhat-ethers@^2.0.5 @nomiclabs/hardhat-waffle@^2.0.3 
npm install --save-dev chai@^4.3.6 ethereum-waffle@^3.4.4 ethers@^5.6.2 hardhat@^2.9.2
```
3. To upgrade a contract we have to install a plugin of an openzeppelin 

`npm install --save-dev @openzeppelin/hardhat-upgrades`



## Deploying Smart Contract to Localhost

1. Write your smart contract in Solidity and save it in the `contracts/` folder.

2. In the `hardhat.config.js` file, configure your local development network by adding the following:

```
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
  ```

  3. In the `scripts/` folder, create two folder one is num1-scripts.js and second is upgrade-num1.js to deploy your contract to the local network:

  
  * In num1-scripts.js folder write:
  ```
  const { ethers, upgrades} = require("hardhat");

async function main(){
    const NUM1 = await ethers.getContractFactory("NUM1");
    console.log("Deploying NUM version 1");
    const num1 = await upgrades.deployProxy(NUM1,[10],{
        initializer:'update'
    })
    await num1.deployed();
    console.log("NUM1 deployed address", num1.address)
}

main();

//0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```
* In upgrade-num1.js folder write:
```
const { ethers, upgrades} = require("hardhat");

async function main(){

    const NUM2 = await ethers.getContractFactory("NUM2");
    console.log("NUM1 is upgrading .....");
    await upgrades.upgradeProxy('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',NUM2);
    console.log("NUM1 upgraded to NUm2");
}

main();
```
4. Compile and deploy the smart contract using Hardhat

```
npx hardhat compile
npx hardhat run scripts/num1-scripts.js --network localhost

``` 

Now after writing upgrade_num1.js in script file we run a command:

 `npx hardhat run --network localhost scripts/upgrade_num1.js`

This will deploy your smart contract to the local development network.

## Is Immutability of Smart Contract are effected by Proxy-Contracts?

* The immutability of a smart contract is not affected by the use of proxy contracts.
* Proxy contracts act as intermediaries between users and the implementation contract.
* Proxy contracts delegate function calls to the implementation contract without modifying its code or state.
* Upgrading the implementation contract behind the proxy does not alter the immutability of the original deployment.
* Proxy contracts enable upgradeability while preserving the immutability of the underlying implementation contract.

## Important Points 
* When you deploy a contracts using **deployProxy** that contract instance can be **upgraded** later.
* Only the address that originally deployed the contract has the rights to upgrade it.

## Usage
To use the proxy smart contract, follow the deployment and upgrading steps mentioned above. Once the contracts are deployed and upgraded, users can interact with the proxy contract as if it were the implementation contract. Any changes made to the implementation contract can be seamlessly upgraded without disrupting user interactions or requiring data migration.

## License
This project is licensed under the MIT License. 
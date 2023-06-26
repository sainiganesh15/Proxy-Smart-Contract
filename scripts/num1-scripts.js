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
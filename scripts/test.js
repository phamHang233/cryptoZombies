const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
var fs = require('fs');
//const { Provider } = require("web3/providers");
const fsPromises = fs.promises;
abi_file_path = 'artifacts/contracts/zombieFactory.sol/ZombieFactory.json';
async function getAbi() {
    const data = await fsPromises.readFile(abi_file_path, 'utf-8');
    const abi = JSON.parse(data)['abi'];
    // console.log(abi)
    return abi;
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com",);
    // const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/",);
    const ownerWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const
    // const abi = getAbi();
    const Rand = await ethers.getContractFactory("ZombieFactory");
    // ZombieFactory: địa chỉ biến contract 
    const rd = await Rand.attach("0x05644497f7e021fcAF33d9B0cAbb720d65D44cab");
    const rdOwner = await rd.connect(ownerWallet);

    try {
        const tx = await rdOwner.functions.createRandomZombie("hang");
        await tx.wait();
        console.log(tx);
        // rdOwner.functions
    } catch (err) {
        console.log(err)
        console.log("can not create zombie");
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider());
// var version = web3.version.api;

// $.getJSON('https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=0x0000000000000000000000000000000000001004&apikey=YourApiKeyToken', function (data) {
//     var contractABI = "";
//     contractABI = JSON.parse(data.result);
//     if (contractABI != '') {
//         var MyContract = web3.eth.contract(contractABI);
//         var myContractInstance = MyContract.at("0x0000000000000000000000000000000000001004");
//         var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
//         console.log("result1 : " + result);
//         var result = myContractInstance.members(1);
//         console.log("result2 : " + result);
//     } else {
//         console.log("Error");
//     }
// });
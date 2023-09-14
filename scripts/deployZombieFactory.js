const hre = require("hardhat");
const ethers = hre.ethers;

require("dotenv").config();

async function main() {
  const zombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
  const signer = (await ethers.getSigners())[0]; // Lấy một tài khoản để gửi giao dịch

  // Triển khai hợp đồng thông minh
  const zombieFactoryInstance = await zombieFactory.deploy();
  await zombieFactoryInstance.deployTransaction.wait(); // Đợi giao dịch triển khai được xác nhận

  console.log("zombieFactory deployed at:", zombieFactoryInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

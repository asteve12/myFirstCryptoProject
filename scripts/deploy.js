const hre = require('hardhat');

async function main() {
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.deployed();

  const Notify = await hre.ethers.getContractFactory('Notify');
  const notify = await Notify.deploy();

  await notify.deployed();
  console.log('notify is deployed to this address:', notify.address);

  console.log('Greeter deployed to:', greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

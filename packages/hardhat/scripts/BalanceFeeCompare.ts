import { ethers } from "ethers";

const levelLP = "0x32B7bF19cb8b95C27E644183837813d4b595dcc6";
const muxLP = "0x3e0199792Ce69DC29A0a36146bFa68bd7C8D6633";

async function getTotalBalance(poolAddress: string): Promise<number> {
  const provider = ethers.getDefaultProvider("homestead"); // Change to 'rinkeby' or 'mainnet' as needed
  const contractABI = ["function totalBalance() view returns (uint256)"];
  const contract = new ethers.Contract(poolAddress, contractABI, provider);

  const totalBalance = await contract.totalBalance();
  return totalBalance;
}

function calculateBorrowFee(positionSize: number, totalBalance: number): [number, number] {
  const borrowFee1 = (positionSize / totalBalance) * 0.0001; // 0.01% = 0.0001
  const borrowFee2 = (positionSize / totalBalance) * 0.0001;
  return [borrowFee1, borrowFee2];
}

async function main() {
  try {
    const totalBalancePool1 = await getTotalBalance(levelLP);
    const totalBalancePool2 = await getTotalBalance(muxLP);

    const positionSize = 1000; // Replace this with your desired position size

    const [borrowFee1, borrowFee2] = calculateBorrowFee(positionSize, totalBalancePool1);

    console.log("Total Balance Pool 1:", totalBalancePool1.toString());
    console.log("Total Balance Pool 2:", totalBalancePool2.toString());
    console.log("Borrow Fee 1:", borrowFee1);
    console.log("Borrow Fee 2:", borrowFee2);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

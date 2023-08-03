import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useContractRead, useContractWrite } from "wagmi";
import { orderManagerABI, useGmxRouterApprovePlugin } from "~~/generated/external";

const Surplus: NextPage = () => {
  const [isLong, setIsLong] = useState(true);

  const arg1 =
    "0x0000000000000000000000000000000000000000000000000006a1461c1d7860000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000013e52b9abe0000000000000000000000000000000000000000051614a5f03b44bdd1a2afad490000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

  /** 
   *  Encoding the byte calblback data for placeLeverageOrder()
   * 
  const newData = encodeAbiParameters(
    [
      { name: "price", type: "uint256" },
      { name: "paytoken", type: "address" },
      { name: "purchaseAmount", type: "uint256" },
      { name: "sizeChange", type: "uint256" },
      { name: "extradata", type: "bytes" },
    ],
    [
      295832867570500029598530000n,
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      15000000n,
      292599942284916529275070890000000n,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    ],
  );
  */

  const { write: placeLeverageOrder } = useContractWrite({
    address: "0x2215298606C9D0274527b13519Ec50c3A7f1c1eF",
    abi: orderManagerABI,
    functionName: "placeLeverageOrder",
    value: parseEther("0.01"),
    args: [0, 0, "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", 0, arg1],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const { data: orders } = useContractRead({
    address: "0x2215298606C9D0274527b13519Ec50c3A7f1c1eF",
    abi: orderManagerABI,
    functionName: "getOrders",
    args: ["0xD5B208A75BEEb455CB834856C69650aa88167A79", BigInt(0), BigInt(10)],
  });

  console.log(orders);

  const { writeAsync: approvePluginAsync } = useGmxRouterApprovePlugin({
    args: ["0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868"],
  });

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="mb-5">
          <ConnectButton />
        </div>
        <div className="flex justify-center gap-8">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title">Trade</h1>
              <div className="tabs tabs-boxed">
                <a className={`flex-1 tab ${isLong && "tab-active"}`} onClick={() => setIsLong(true)}>
                  Long
                </a>
                <a className={`flex-1 tab ${!isLong && "tab-active"}`} onClick={() => setIsLong(false)}>
                  Short
                </a>
              </div>

              <button className="btn" onClick={() => placeLeverageOrder()}>
                LONG ETH LEVEL
              </button>

              <button className="btn" onClick={() => approvePluginAsync()}>
                Approve Plugin
              </button>
              <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="card-title">Orders</h1>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Position</th>
                      <th>Collateral</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>getOrders[0]</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>

                    <tr>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>

                    <tr>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surplus;

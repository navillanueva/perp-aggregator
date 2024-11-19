import { useState } from "react";
import { orderManagerABI, useGmxRouterApprovePlugin } from "../generated/external";
import { placeOrder } from "../utils/vertexApi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useContractRead, useContractWrite } from "wagmi";
import { useWalletClient } from "wagmi";

const Surplus: NextPage = () => {
  // wagmi/gmx shit
  const [isLong, setIsLong] = useState(true);
  const arg1 =
    "0x0000000000000000000000000000000000000000000000000006a1461c1d7860000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000013e52b9abe0000000000000000000000000000000000000000051614a5f03b44bdd1a2afad490000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

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

  // test users

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

  // vertex shit
  const [vertexOrderResponse, setVertexOrderResponse] = useState(null);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState("eth-perp");
  const [price, setPrice] = useState(2000); // Example price
  const [size, setSize] = useState(1); // Example size
  const [orderType, setOrderType] = useState("LIMIT"); // Order type (LIMIT or MARKET)

  const handlePlaceVertexOrder = async () => {
    try {
      const { data: walletClient } = useWalletClient();
      if (!walletClient) {
        throw new Error("No wallet client available");
      }

      const provider = new ethers.providers.Web3Provider(walletClient as any);
      const signer = provider.getSigner();
      const orderData = {
        product_id: product,
        price,
        amount: size,
        is_bid: orderType === "LIMIT",
        expiration: Math.floor(Date.now() / 1000) + 300, // Example expiration
        nonce: Date.now(), // use wallet's nonce
      };

      const response = await placeOrder(signer, orderData);
      setVertexOrderResponse(response);
      console.log("Order placed successfully:", response);
    } catch (err: any) {
      setError(err.message);
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="mb-5">
        <ConnectButton />
      </div>
      <div className="flex justify-center gap-8">
        {/* GMX Order Card */}
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
              LONG ETH LEVEL (GMX)
            </button>

            <button className="btn" onClick={() => approvePluginAsync()}>
              Approve Plugin
            </button>

            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Vertex Order Card */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Vertex Order</h1>
            <div className="form-control">
              <label>
                Product:
                <input
                  type="text"
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                  className="input input-bordered"
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="input input-bordered"
                />
              </label>
              <label>
                Size:
                <input
                  type="number"
                  value={size}
                  onChange={e => setSize(Number(e.target.value))}
                  className="input input-bordered"
                />
              </label>
              <label>
                Order Type:
                <select
                  value={orderType}
                  onChange={e => setOrderType(e.target.value)}
                  className="select select-bordered"
                >
                  <option value="LIMIT">LIMIT</option>
                  <option value="MARKET">MARKET</option>
                </select>
              </label>
            </div>

            <button className="btn" onClick={handlePlaceVertexOrder}>
              Place Vertex Order
            </button>

            {error && <div style={{ color: "red" }}>Error: {error}</div>}
            {vertexOrderResponse && <div>Order Response: {JSON.stringify(vertexOrderResponse)}</div>}
          </div>
        </div>

        {/* Orders Table */}
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
  );
};

export default Surplus;

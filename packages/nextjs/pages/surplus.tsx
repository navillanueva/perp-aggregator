import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useGmxRouterApprovePlugin } from "~~/generated/external";

const Surplus: NextPage = () => {
  const [isLong, setIsLong] = useState(true);
  const { writeAsync: approvePluginAsync } = useGmxRouterApprovePlugin({
    args: ["0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868"],
  });

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="mb-5">
          <ConnectButton />
        </div>
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
            <button className="btn" onClick={() => approvePluginAsync()}>
              Approve Plugin
            </button>
            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surplus;

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

const Surplus: NextPage = () => {
  const [isLong, setIsLong] = useState(true);

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
            <p>If a dog chews shoes whose shoes does he choose?</p>
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

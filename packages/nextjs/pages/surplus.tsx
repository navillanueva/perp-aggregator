import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Surplus: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex-1 flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Trade</h1>
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

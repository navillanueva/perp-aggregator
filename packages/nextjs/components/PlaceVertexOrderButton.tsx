import { useState } from "react";
import { placeOrder } from "../utils/vertexApi";
import { useAccount} from "wagmi";
import { getWalletClient, WalletClient } from '@wagmi/core';
import { ethers } from 'ethers';


const PlaceOrderButton = () => {
  const { address } = useAccount(); // Get the user's wallet address
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handlePlaceOrder = async () => {
    if (!address) {
      throw new Error("Please connect your wallet first");
    }

    setIsLoading(true);
    setError(null);

      try {
          // Step 1: Get the wallet client
          const walletClient: WalletClient = await getWalletClient();
          if (!walletClient) {
              throw new Error('No wallet client available');
          }

          const provider = new ethers.providers.Web3Provider(walletClient as any);
          const signer = provider.getSigner();


          const orderData = {
      product_id: "eth-perp",
      price: 2000, // fetch price with other query in the future
      amount: 1, // set dynamically
      is_bid: true, // Buy order
      expiration: Math.floor(Date.now() / 1000) + 300, // set longer
      nonce: Date.now(), // get nonce from the wallet
    };

    try {
      const result = await placeOrder(signer, orderData);
      setResponse(result);
      console.log("Order placed successfully:", result);
    } catch (err: any) {
      setError(err.message);
      console.error("Failed to place order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="btn" onClick={handlePlaceOrder} disabled={isLoading}>
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {response && <p>Order Response: {JSON.stringify(response)}</p>}
    </div>
  );
};

export default PlaceOrderButton;

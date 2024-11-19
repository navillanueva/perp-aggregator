import axios from "axios";
import { AbiCoder, keccak256 } from "ethers";

const VERTEX_ENGINE_ENDPOINT = process.env.VERTEX_GATEWAY_ENDPOINT;

const vertexApi = axios.create({
  baseURL: VERTEX_ENGINE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const placeOrder = async (
  signer: any,
  orderData: {
    product_id: string;
    price: number;
    amount: number;
    is_bid: boolean;
    expiration: number;
    nonce: number;
  },
) => {
  try {
    // Step 1: Generate signature
    const orderPayload = {
      product_id: orderData.product_id,
      price: orderData.price,
      amount: orderData.amount,
      is_bid: orderData.is_bid,
      expiration: orderData.expiration,
      nonce: orderData.nonce,
    };

    const abiCoder = new AbiCoder();

    const payloadHash = keccak256(
      abiCoder.encode(
        ["string", "uint256", "uint256", "bool", "uint256", "uint256"],
        [
          orderData.product_id,
          orderData.price,
          orderData.amount,
          orderData.is_bid,
          orderData.expiration,
          orderData.nonce,
        ],
      ),
    );

    const signature = await signer.signMessage(payloadHash);
    const senderAddress = await signer.getAddress();

    // Step 2: Send order request
    const response = await vertexApi.post("/executes/place-order", {
      ...orderPayload,
      sender: senderAddress,
      signature,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

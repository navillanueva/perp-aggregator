import axios from "axios";

const VERTEX_ENGINE_ENDPOINT =
  process.env.NEXT_PUBLIC_VERTEX_ENGINE_ENDPOINT || "https://api.vertexprotocol.com/engine";

// Axios instance for Vertex API

const vertexApi = axios.create({
  baseURL: VERTEX_ENGINE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const placeOrder = async (orderData: {
  product_id: string;
  price: number;
  size: number;
  order_type: string;
}) => {
  try {
    const response = await vertexApi.post("/orders", orderData);
    return response.data;
  } catch (error: any) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

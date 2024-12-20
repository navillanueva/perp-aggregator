import { arbitrum } from "@wagmi/chains";
import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  if (!env.ARBISCAN_API_KEY) {
    console.log("Missing ARBISCAN_API_KEY");
  }

  return {
    out: "./generated/external.ts",
    plugins: [
      etherscan({
        apiKey: env.ARBISCAN_API_KEY,
        chainId: arbitrum.id,
        contracts: [
          {
            name: "GMXPositionRouter",
            address: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
          },
          {
            name: "GMXRouter",
            address: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
          },
          {
            name: "OrderManager",
            address: "0x5b5d94B1574a8A910E6FC0a38949f5B256f22FF9",
          },
        ],
      }),
      react(),
    ],
  };
});

import { arbitrum } from "@wagmi/chains";
import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  return {
    out: "./generated/external.ts",
    plugins: [
      etherscan({
        apiKey: env.ARBISCAN_API_KEY!,
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
        ],
      }),
      react(),
    ],
  };
});

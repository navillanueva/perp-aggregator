import { arbitrum } from "@wagmi/chains";
import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  out: "./generated/external.ts",
  plugins: [
    etherscan({
      apiKey: process.env.ARBISCAN_API_KEY!,
      chainId: arbitrum.id,
      contracts: [
        {
          name: "PositionRouter",
          address: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
        },
      ],
    }),
    react(),
  ],
});

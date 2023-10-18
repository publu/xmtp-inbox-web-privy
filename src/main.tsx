import './polyfills.ts';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { PrivyProvider } from '@privy-io/react-auth'
import { mainnet, goerli } from 'wagmi/chains';
import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";
import App from "./controllers/AppController";
import { isAppEnvDemo } from "./helpers";
import { mockConnector } from "./helpers/mockConnector";

// Increment with any schema change; e.g. adding support for a new content type
const DB_VERSION = 3;

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
];

const configureChainsConfig = configureChains([mainnet, goerli], [publicProvider()]);

const projectId = import.meta.env.VITE_PROJECT_ID || "222db3ac25ae83568adbeb141b834b09";
const appName = "XMTP Inbox Web";

createRoot(document.getElementById("root") as HTMLElement).render(
  <PrivyProvider appId="clmqiq9ey07j5l20fobyhgy47">
    <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
      <StrictMode>
        <XMTPProvider
          contentTypeConfigs={contentTypeConfigs}
          dbVersion={DB_VERSION}>
          <App />
        </XMTPProvider>
      </StrictMode>
    </PrivyWagmiConnector>
  </PrivyProvider>,
);


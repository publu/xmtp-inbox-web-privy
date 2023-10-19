import { useDisconnect } from "wagmi";
import { useClient } from "@xmtp/react-sdk";
import SideNav from "../component-library/components/SideNav/SideNav";
import type { ETHAddress } from "../helpers";
import { wipeKeys } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { useWallets, useLogin, usePrivy } from '@privy-io/react-auth'

export const SideNavController = () => {
  const { client, disconnect } = useClient();
  const resetXmtpState = useXmtpStore((s) => s.resetXmtpState);
  const clientName = useXmtpStore((s) => s.clientName);
  const clientAvatar = useXmtpStore((s) => s.clientAvatar);
  const { reset: resetWagmi } = useDisconnect();
  const { disconnect: disconnectWagmi } = useDisconnect();
  const { signMessage, sendTransaction, exportWallet } = usePrivy()

  return (
    <SideNav
      displayAddress={clientName ?? client?.address}
      walletAddress={client?.address as ETHAddress | undefined}
      avatarUrl={clientAvatar || ""}
      exportWallet={exportWallet}
      onDisconnect={() => {
        void disconnect();
        disconnectWagmi();
        wipeKeys(client?.address ?? "");
        resetWagmi();
        resetXmtpState();
      }}
    />
  );
};

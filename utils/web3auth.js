import RPC from "../ethersRPC.ts";

const login = async (web3auth, setProvider) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();
  setProvider(web3authProvider);
};

const authenticateUser = async (web3auth) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const idToken = await web3auth.authenticateUser();
  console.log(idToken);
};

const getUserInfo = async (web3auth) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  console.log(user);
};

const logout = async (web3auth, setProvider) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
};

const getChainId = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const chainId = await rpc.getChainId();
  console.log(chainId);
};

const getAccounts = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  console.log(address);
};

const getBalance = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balance = await rpc.getBalance();
  console.log(balance);
};

const sendTransaction = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  console.log(receipt);
};

const signMessage = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const signedMessage = await rpc.signMessage();
  console.log(signedMessage);
};

const getPrivateKey = async (provider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const privateKey = await rpc.getPrivateKey();
  console.log(privateKey);
};

export {
  login,
  authenticateUser,
  getUserInfo,
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  getPrivateKey,
  logout,
};

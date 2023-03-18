import RPC from "../ethersRPC.ts";

const login = async (web3auth, setProvider) => {
  if (!web3auth) {
    alert("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();
  setProvider(web3authProvider);
};

const authenticateUser = async (web3auth) => {
  if (!web3auth) {
    alert("web3auth not initialized yet");
    return;
  }
  const idToken = await web3auth.authenticateUser();
  alert(idToken.idToken);
};

const getUserInfo = async (web3auth) => {
  if (!web3auth) {
    alert("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  alert(JSON.stringify(user));
};

const logout = async (web3auth, setProvider) => {
  if (!web3auth) {
    alert("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
};

const getChainId = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const chainId = await rpc.getChainId();
  alert(chainId);
};

const getAccounts = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  alert(address);
};

const getBalance = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balance = await rpc.getBalance();
  alert(balance);
};

const sendTransaction = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  alert(receipt);
};

const signMessage = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const signedMessage = await rpc.signMessage();
  alert(signedMessage);
};

const getPrivateKey = async (provider) => {
  if (!provider) {
    alert("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const privateKey = await rpc.getPrivateKey();
  alert(privateKey);
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

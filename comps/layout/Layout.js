import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ provider, web3auth, setProvider, children }) {
  return (
    <div className="bg-navBg">
      <Header
        provider={provider}
        web3auth={web3auth}
        setProvider={setProvider}
      />
      {children}
      <Footer />
    </div>
  );
}

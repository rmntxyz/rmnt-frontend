import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ web3auth, setProvider, children }) {
  return (
    <div className="bg-navBg">
      <Header web3auth={web3auth} setProvider={setProvider} />
      {children}
      <Footer />
    </div>
  );
}

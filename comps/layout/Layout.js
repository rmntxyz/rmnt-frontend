import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ account, setAccount, children }) {
  return (
    <div className="bg-navBg">
      <Header account={account} setAccount={setAccount} />
      {children}
      <Footer />
    </div>
  );
}

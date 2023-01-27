import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="bg-navBg">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

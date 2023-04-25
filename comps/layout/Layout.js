import Footer from "./Footer";
import Header from "./Header";
import NextNProgress from "nextjs-progressbar";

export default function Layout({ children }) {
  return (
    <div className="bg-navBg">
      <NextNProgress color="#70EFCF" options={{ showSpinner: false }} />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

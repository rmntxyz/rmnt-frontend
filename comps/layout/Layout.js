import Footer from "./Footer";
import Header from "./Header";
import Progress from "./Progress";

export default function Layout({ children }) {
  return (
    <div className="bg-navBg">
      <Progress />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

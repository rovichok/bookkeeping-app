import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout is the shared page frame.
// Every page gets the same Navbar at the top and Footer at the bottom.
// The page-specific content is passed in through "children".
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

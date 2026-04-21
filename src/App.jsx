import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

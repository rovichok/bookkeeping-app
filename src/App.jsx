import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";

// App is the route shell.
// Layout is shared across all pages.
// Outlet is where the currently matched page gets inserted.
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

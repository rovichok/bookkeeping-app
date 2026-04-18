import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // top-level wrapper that renders Layout + Outlet
import HomePage from "../pages/HomePage";
import PricingPage from "../pages/PricingPage";
import ContactPage from "../pages/ContactPage";
import CleanupPage from "../pages/services/CleanupPage";
import MonthlyBookkeepingPage from "../pages/services/MonthlyBookkeepingPage";
import QuickBooksSupportPage from "../pages/services/QuickBooksSupportPage";

// createBrowserRouter uses normal browser URLs like /pricing or /contact.
// This is the routing table for the site.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the shell around all pages
    children: [
      // index:true means this page renders at "/"
      { index: true, element: <HomePage /> },

      // route: /pricing
      { path: "pricing", element: <PricingPage /> },

      // route: /contact
      { path: "contact", element: <ContactPage /> },

      // route: /services/cleanup
      { path: "services/cleanup", element: <CleanupPage /> },

      // route: /services/monthly-bookkeeping
      {
        path: "services/monthly-bookkeeping",
        element: <MonthlyBookkeepingPage />,
      },

      // route: /services/quickbooks-support
      {
        path: "services/quickbooks-support",
        element: <QuickBooksSupportPage />,
      },
    ],
  },
]);

export default router;

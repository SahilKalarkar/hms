// frontend/src/App.jsx
import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import routes from "./routes";
import { ConfigProvider } from "antd";
import { hospitalTheme } from "./theme/themeConfig";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <ConfigProvider theme={hospitalTheme}>
      <div className="flex flex-col min-h-screen"
        style={{
          background: "linear-gradient(135deg, #f8fdff 0%, #e6f8ff 60%, #d4f4ff 100%)",
        }}>
        {!isAdminRoute && <Navbar />}

        <main
          className={`w-full grow ${isAdminRoute
            ? "h-screen"
            : "px-4 py-6 max-w-7xl mx-auto"
            }`}
        >     {routes}
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </ConfigProvider>
  );
};

export default App;
// Import Third-party modules
import React from "react";

// Import User-defined modules
import { IAppTypes } from "./types/App.types";
import * as Components from "./components";
import "./App.css";

/**
 * App component of our application.
 * @returns App styled page.
 */
const App: React.FC<IAppTypes> = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Components.Navbar />
        <Components.Welcome />
      </div>
      <Components.Services />
      <Components.Transactions />
      <Components.Footer />
    </div>
  );
};

export default App;

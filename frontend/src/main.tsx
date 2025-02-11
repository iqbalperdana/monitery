import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="bg-white dark:bg-black font-pacifico">
    <App />
  </div>
);

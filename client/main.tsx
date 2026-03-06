import { createRoot } from "react-dom/client";
import App from "./App";

// Store root at module level so it persists across HMR updates
let root: ReturnType<typeof createRoot> | null = null;

function initializeApp() {
  const container = document.getElementById("root");
  if (!container) return;

  // Only create root once
  if (!root) {
    root = createRoot(container);
  }

  // Always render the latest App
  root.render(<App />);
}

// Initial app initialization
initializeApp();

// HMR: Accept updates and re-render without recreating root
if (import.meta.hot) {
  import.meta.hot.accept(["./App"], () => {
    initializeApp();
  });
}

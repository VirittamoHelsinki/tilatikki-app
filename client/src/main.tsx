//React's StrictMode is sort of a helper component that will help you write better React 
//components, you can wrap a set of components with <StrictMode /> and it'll basically
//Verify that the components inside are following some of the recommended practices and warn you if not in the console.
//Verify the deprecated methods are not being used, and if they're used strict mode will warn you in the console.
//Help you prevent some side effects by identifying potential risks.

// Import the `StrictMode` and `createRoot` components from React and React-dom.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

// Create a root DOM element and render the `App` component in StrictMode.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
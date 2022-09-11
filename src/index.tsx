import { FC } from "react";
import { createRoot } from "react-dom/client";
import { AppearanceProvider } from "@twa-dev/mark42";
import Diamond from "./images/diamond.svg";
import styles from "./index.css";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Diamond />
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);

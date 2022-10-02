import { createRoot } from "react-dom/client";
import { AppearanceProvider } from "@twa-dev/mark42";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<AppearanceProvider></AppearanceProvider>);

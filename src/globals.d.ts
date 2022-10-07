declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.ttf" {
  const value: string;
  export default value;
}

declare module "*.woff" {
  const value: string;
  export default value;
}

declare module "*.woff2" {
  const value: string;
  export default value;
}

declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "*.module.css";

declare module "*.component.svg" {
  import { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

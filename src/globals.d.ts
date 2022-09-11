declare module "*.png";
declare module "*.jpg";
declare module "*.gif";

declare module "*.svg" {
  import { FC, SVGProps } from "react";
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

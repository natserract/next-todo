// / <reference types="next" />
// / <reference types="next/types/global" />
// / <reference types="next-images" />

declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
  }

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}
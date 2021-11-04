// / <reference types="next" />
// / <reference types="next/types/global" />
// / <reference types="next-images" />

type CustomTheme = {
    [Key in keyof typeof theme]: typeof theme[Key]
}
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

declare module '@material-ui/core/styles/createTheme' {
    interface Theme extends CustomTheme { }
    interface ThemeOptions extends CustomTheme { }
}
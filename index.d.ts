declare module 'minimasonry' {
  export interface MiniMasonryOptions {
    container: string | ReturnType<typeof document.querySelector>;
    baseWidth?: number;
    gutter?: number;
    gutterX?: number;
    gutterY?: number;
    minify?: boolean;
    surroundingGutter?: boolean;
    ultimateGutter?: number;
    direction?: 'ltr' | 'rtl';
    wedge?: boolean;
    responsive?: boolean;
  }

  export default class MiniMasonry {
    constructor(opts: MiniMasonryOptions);

    layout(): void;
    destroy(): void;
  }
}

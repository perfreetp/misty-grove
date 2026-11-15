export interface ViewInstance {
  mount(root: HTMLElement): void;
  update(): void;
  destroy(): void;
}

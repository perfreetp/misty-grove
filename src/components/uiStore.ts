import { create } from 'zustand';

export type ToastKind = 'ok' | 'err' | 'info';
export interface Toast {
  id: number;
  msg: string;
  kind: ToastKind;
}

interface UIState {
  toasts: Toast[];
  toast: (msg: string, kind?: ToastKind) => void;
  dismiss: (id: number) => void;
}

let seq = 1;
export const useUI = create<UIState>((set) => ({
  toasts: [],
  toast: (msg, kind = 'ok') => {
    const id = ++seq;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, msg, kind }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3400);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

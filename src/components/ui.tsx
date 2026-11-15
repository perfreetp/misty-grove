import { createSignal, useContext, type JSX } from 'solid-js';
import { createContext } from 'solid-js';

// ===== 轻量 Toast =====
interface Toast {
  id: number;
  text: string;
  error: boolean;
}
const ToastCtx = createContext<(text: string, error?: boolean) => void>();

export function ToastProvider(props: { children: JSX.Element }) {
  const [toasts, setToasts] = createSignal<Toast[]>([]);
  let seq = 0;
  const push = (text: string, error = false) => {
    const id = ++seq;
    setToasts((t) => [...t, { id, text, error }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  return (
    <ToastCtx.Provider value={push}>
      {props.children}
      {toasts().map((t) => <div class={`toast${t.error ? ' error' : ''}`}>{t.text}</div>)}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx)!;
}

// ===== 表单字段 =====
export function Field(props: {
  label: string;
  unit?: string;
  children: JSX.Element;
}) {
  return (
    <div class="field">
      <label>{props.label}</label>
      {props.children}
      {props.unit && <span class="unit">{props.unit}</span>}
    </div>
  );
}

// ===== 数字输入 =====
export function NumberInput(props: {
  value: number;
  onInput: (v: number) => void;
  step?: number;
  disabled?: boolean;
  min?: number;
}) {
  return (
    <input
      type="number"
      step={props.step ?? 0.1}
      min={props.min}
      disabled={props.disabled}
      value={props.value}
      onInput={(e) => {
        const v = Number(e.currentTarget.value);
        if (!Number.isNaN(v)) props.onInput(v);
      }}
    />
  );
}

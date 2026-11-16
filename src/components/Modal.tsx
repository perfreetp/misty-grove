import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { IconCheck, IconWarn, IconX } from './Icons';
import { useUI } from './uiStore';

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismiss);
  return (
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`} onClick={() => dismiss(t.id)}>
          <span
            style={{
              color: t.kind === 'ok' ? 'var(--green)' : t.kind === 'err' ? 'var(--red)' : 'var(--blue)',
            }}
          >
            {t.kind === 'ok' ? <IconCheck size={14} /> : <IconWarn size={14} />}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

interface ModalProps {
  title: string;
  desc?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  width?: number;
}

export function Modal({ title, desc, children, footer, onClose, width = 520 }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div
      className="overlay-bg"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" style={{ maxWidth: width }} ref={ref}>
        <div className="modal-hd">
          <div className="grow">
            <h2>{title}</h2>
            {desc && <p>{desc}</p>}
          </div>
          <button className="icon-btn" onClick={onClose} title="关闭">
            <IconX size={14} />
          </button>
        </div>
        {children && <div className="modal-body">{children}</div>}
        {footer && <div className="modal-ft">{footer}</div>}
      </div>
    </div>
  );
}

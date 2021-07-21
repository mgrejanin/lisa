import React, { forwardRef, ForwardRefRenderFunction, ReactNode, Ref } from 'react';
import { MDCDialog } from '@material/dialog';
import { MutableRefObject, useEffect, useState } from 'react';

import './styles.scss';

interface ModalProps {
    children: ReactNode;
}

export function useModal(dialogRef: MutableRefObject<HTMLDivElement>): { dialog: MDCDialog } {
    const [dialog, setDialog] = useState<MDCDialog>();
    useEffect(() => {
        setDialog(new MDCDialog(dialogRef.current));
    }, [dialogRef]);

    return { dialog };
}

const ModalBase: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = ({ children }: ModalProps, ref) => {
    return (
        <div className="mdc-dialog" ref={ref}>
            <div className="mdc-dialog__container">
                <div
                    className="mdc-dialog__surface"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content"
                >
                    <div className="mdc-dialog__content" id="my-dialog-content">
                        {children}
                    </div>
                </div>
            </div>
            <div className="mdc-dialog__scrim"></div>
        </div>
    );
};
export const Modal = forwardRef(ModalBase);

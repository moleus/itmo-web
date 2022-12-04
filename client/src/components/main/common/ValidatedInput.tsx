import React from 'react';
import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form';

interface ValidatedInputProps {
    label: string;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    children: React.ReactNode;
}

const ValidatedInput = ({label, error, children}: ValidatedInputProps) => (
    <div className="ring-form__group">
        <label className="ring-form__label">{label}</label>
        <div className="ring-form__control">
            {children}
            {error && <div className="ring-error-bubble active">{error.message}</div>}
        </div>
    </div>
);

export default ValidatedInput;
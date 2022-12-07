import React from 'react';
import {FieldError} from 'react-hook-form';

interface ValidatedInputProps {
    label: string;
    error: FieldError;
    children: React.ReactElement;
}

const ValidatedInput = ({label, error, children}: ValidatedInputProps) => (
    <div className="ring-form__group">
        <label className="ring-form__label">{label}</label>
        <div className="ring-form__control">
                <div className={`${error && "ring-input_error"}`}>
                    {children}
                </div>
            {error && <div className="ring-error-bubble active">{error.message}</div>}
        </div>
    </div>
);

export default ValidatedInput;
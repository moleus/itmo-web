import React from 'react';
import {FieldError, FieldValues} from 'react-hook-form';

interface ValidatedInputProps<T> {
    label: string;
    error: FieldError | undefined;
    children: React.ReactElement;
}

const ValidatedInput = <T extends FieldValues>({label, error, children}: ValidatedInputProps<T>) => (
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
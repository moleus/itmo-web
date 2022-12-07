import React from 'react';


interface ButtonProps {
   label: string
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({label, onClick}: ButtonProps) => (
    <button type="button" className="input-field backlight clickable" onClick={onClick}>
        {label}
    </button>
);

export default Button;
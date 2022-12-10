import React from 'react';


interface ButtonProps {
   label: string
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({label, onClick, ...other}: ButtonProps) => (
    <button type="button" className="input-field backlight clickable" onClick={onClick} {...other}>
        {label}
    </button>
);

export default Button;
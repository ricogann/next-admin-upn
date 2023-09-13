import React, { ChangeEvent } from "react";

type InputProps = {
    name: string;
    type: string;
    className: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="">
            <input
                name={props.name}
                type={props.type}
                className={props.className}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    );
};

export { Input };

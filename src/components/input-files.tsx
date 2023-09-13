import React, { ChangeEvent } from "react";

type InputFiles = {
    name: string;
    type: string;
    placeholder: string;
    className: string;
    accept: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputFiles: React.FC<InputFiles> = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={props.className}
            accept={props.accept}
            multiple
            onChange={props.onChange}
        />
    );
};

export { InputFiles };

import React, { ChangeEvent } from "react";

type TextareaProps = {
    name: string;
    className: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: React.FC<TextareaProps> = (props) => {
    return (
        <div className="">
            <textarea
                name={props.name}
                className={props.className}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    );
};

export { Textarea };

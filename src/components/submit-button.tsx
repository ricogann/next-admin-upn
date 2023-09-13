import React, { ChangeEvent } from "react";

type SubmitProps = {
    message: string;
    className: string;
    onClick: () => void;
};

const Submit: React.FC<SubmitProps> = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.message}
        </button>
    );
};

export { Submit };

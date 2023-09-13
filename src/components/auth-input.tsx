import React, { ChangeEvent } from "react";

type AuthInputProps = {
    name: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput: React.FC<AuthInputProps> = (props) => {
    return (
        <div className="">
            <input
                name={props.name}
                type={props.type}
                className={`border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] md:w-[500px] md:p-3 lg:p-2`}
                onChange={props.onChange}
            />
        </div>
    );
};

export { AuthInput };

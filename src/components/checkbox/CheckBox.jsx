import React from "react";

const CheckBox = React.forwardRef(
    ({ 
        id, className = `text-black-4`, labelText, onChange, onClick, hideLabel, invalid, invalidText, value, name, checked, option, title = "", ...other
    }, ref) => {
        const labelClasses = [
            "ml-3",
            "text-base",
            "text-black-7",
            "leading-6",
            "cursor-pointer"
        ];
        if (hideLabel) {
            labelClasses.push("hidden");
        }
        const errorId = id + "-error-msg";

        const error = invalid ? (
            <div
                className={` text-sm leading-normal mt-2 text-red-dark font-normal `}
                id={errorId}
            >
                {invalidText}
            </div>
        ) : null;

        const inputClasses = [
            "form-checkbox",
            "h-4",
            "w-4",
            "text-blue-5",
            "cursor-pointer"
        ];

        if (error) {
            inputClasses.push("bg-error-light", "border-1", "border-error");
        } else {
            inputClasses.push("transition", "duration-150", "ease-in-out");
        }

        const label = labelText ? (
            <label htmlFor={id} className={labelClasses.join(" ")}>
                {labelText}
            </label>
        ) : null;

        const handleOnchange = (e) => {
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="flex">
                <div className="flex items-center mt-2 ">
                    <input
                        type="checkbox"
                        className={inputClasses.join(" ")}
                        onChange={handleOnchange}
                        value={value}
                        checked={checked}
                        id={id}
                    />
                    {label}
                </div>
            </div>
        );
    }
);

CheckBox.defaultProps = {
    onChange: () => {},
    onClick: () => {},
    invalid: false,
    value: "",
    checked: false
};

export default CheckBox;
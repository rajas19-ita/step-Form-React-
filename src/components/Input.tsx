import React from "react";
import Select from "react-select";

interface InputProps {
    type: "text" | "email" | "date" | "radio" | "tel" | "select";
    title?: string;
    outerDivClass?: string;
    values?: string[];
    value: string;
    error: string | null;
    onChange: (newValue: string) => void;
    placeHolder?: string;
    autoComplete?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const renderTitle = () => {
        switch (props.type) {
            case "text":
            case "email":
            case "date":
            case "tel":
                if (props.title)
                    return (
                        <label htmlFor={props.title} className="font-medium">
                            {props.title}
                        </label>
                    );
                return;
            case "radio":
            case "select":
                if (props.title)
                    return <p className="font-medium mb-2">{props.title}</p>;
                return;
        }
    };

    const renderInput = () => {
        switch (props.type) {
            case "text":
            case "email":
            case "date":
            case "tel":
                return (
                    <input
                        type={props.type}
                        id={props.title}
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded-md"
                        placeholder={props.placeHolder}
                        autoComplete={props.autoComplete}
                    />
                );
            case "radio":
                return (
                    <div className="flex gap-3 " id={props.title}>
                        {props.values?.map((val, i) => (
                            <div className="flex gap-2 items-center" key={i}>
                                <input
                                    type="radio"
                                    id={val}
                                    name={props.title}
                                    className="cursor-pointer"
                                    onChange={(_) => props.onChange(val)}
                                    checked={val === props.value}
                                />
                                <label htmlFor={val} className="mb-1">
                                    {val}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case "select":
                return (
                    <Select
                        value={
                            props.value !== ""
                                ? { value: props.value, label: props.value }
                                : null
                        }
                        options={props.values?.map((val) => ({
                            value: val,
                            label: val,
                        }))}
                        onChange={(val) => {
                            if (val) props.onChange(val.value);
                        }}
                        placeholder={props.placeHolder}
                    />
                );
        }
    };

    return (
        <div
            className={`flex flex-col gap-1 ${props.outerDivClass} ${
                props.type === "date" ? " max-w-56 w-full " : null
            }`}
        >
            {renderTitle()}
            {renderInput()}
            {props.error ? (
                <p className="text-sm text-red-500">{props.error}</p>
            ) : null}
        </div>
    );
};

export default Input;

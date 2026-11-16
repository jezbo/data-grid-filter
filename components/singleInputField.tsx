import React, { FC, useId } from "react";
import { IF } from "../../../../atomic/if/if";
import { SingleInputFieldProps } from "../filterInterfaces";
import { useSingleInputFieldState } from "../hooks";

export const SingleInputField: FC<SingleInputFieldProps> = ({
    value,
    inputType,
    handleChange,
    className,
    label,
    ariaLabel
}) => {
    const inputId = useId();
    const {
        elementRef,
        inputUiConfig,
        inputValue,
        handleChangeByInput
    } = useSingleInputFieldState({ value, inputType, handleChange });

    const { htmlInputType, inputClassName, isCheckbox } = inputUiConfig;

    return (
        <div className={`single-input ${className ?? ""}`}>
            <IF condition={!!label}>
                <label className="input-label" htmlFor={inputId}>{label}</label>
            </IF>
            <input
                id={inputId}
                aria-label={ariaLabel}
                aria-description={isCheckbox ? "Press Space to cycle between any value (no filter), true, and false." : undefined}
                value={isCheckbox ? undefined : String(inputValue ?? "")}
                checked={isCheckbox ? inputValue === true : undefined}
                type={htmlInputType}
                onChange={handleChangeByInput}
                className={inputClassName}
                ref={elementRef}
            />
        </div>
    )
}

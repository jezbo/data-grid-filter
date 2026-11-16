import { ChangeEvent, useEffect, useRef } from "react";
import { getFilterInputUiConfig, getNormalizedFilterInputValue } from "../../gridHelpers";
import { InputType } from "../filterEnums";
import { FilterInputValue, FilterValueChangeHandler } from "../filterInterfaces";

interface UseSingleInputFieldStateProps {
    value?: FilterInputValue;
    inputType: InputType;
    handleChange: FilterValueChangeHandler;
}

export const useSingleInputFieldState = ({
    value,
    inputType,
    handleChange
}: UseSingleInputFieldStateProps) => {
    const elementRef = useRef<HTMLInputElement | null>(null);
    const inputUiConfig = getFilterInputUiConfig(inputType);
    const { isCheckbox } = inputUiConfig;
    const normalizedValue = getNormalizedFilterInputValue(value, isCheckbox);

    useEffect(() => {
        if (isCheckbox && elementRef.current) {
            elementRef.current.indeterminate = normalizedValue === null;
        }
    }, [isCheckbox, normalizedValue]);

    const handleChangeByInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (isCheckbox) {
            handleChange(normalizedValue === null ? true : normalizedValue === true ? false : null);
            return;
        }

        handleChange(e.target.value);
    }

    return {
        elementRef,
        inputUiConfig,
        inputValue: normalizedValue,
        handleChangeByInput
    };
}

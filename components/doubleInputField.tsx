import React, { FC, useCallback } from "react";
import { createValueChangeHandler } from "../helpers/gridColumnFilterInputHelper";
import { FilterIndex, ValueKey } from "../filterEnums";
import { DoubleInputProps } from "../filterInterfaces";
import { SingleInputField } from "./SingleInputField";

export const DoubleInputField: FC<DoubleInputProps> = ({
    values,
    label1,
    label2,
    handleChange,
    inputType,
    className,
    filterContext
}) => {
    const handleFromChange = useCallback(
        createValueChangeHandler(handleChange, ValueKey.filterValue),
        [handleChange]
    );
    const handleToChange = useCallback(
        createValueChangeHandler(handleChange, ValueKey.filterToValue),
        [handleChange]
    );

    return (
        <div className={className}>
            <SingleInputField
                value={values?.filterValue}
                label={label1}
                ariaLabel={`${filterContext} from value`}
                handleChange={handleFromChange}
                inputType={inputType}
                key={`${inputType}-${FilterIndex.first}`}
            />
            <SingleInputField
                value={values?.filterToValue}
                label={label2}
                ariaLabel={`${filterContext} to value`}
                handleChange={handleToChange}
                inputType={inputType}
                key={`${inputType}-${FilterIndex.second}`}
            />
        </div>
    )
}

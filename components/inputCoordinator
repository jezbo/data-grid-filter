import React, { FC, useCallback } from "react";
import { getComparatorInputCount } from "../config/comparatorDefinitions";
import { ComparatorInputCount, ValueKey } from "../filterEnums";
import { InputCoordinatorProps } from "../filterInterfaces";
import { createValueChangeHandler } from "../helpers/gridColumnFilterInputHelper";
import { IF } from "../../../../atomic/if/if";
import { DoubleInputField } from "./doubleInputField";
import { SingleInputField } from "./singleInputField";

export const InputCoordinator: FC<InputCoordinatorProps> = ({
    inputType,
    comparator,
    values,
    valueOnChange,
    className,
    filterContext
}) => {
    const comparatorInputCount = getComparatorInputCount(comparator);
    const handlePrimaryValueChange = useCallback(
        createValueChangeHandler(valueOnChange, ValueKey.filterValue),
        [valueOnChange]
    );

    return (
        <div className={className ?? ""}>
            <IF condition={comparatorInputCount === ComparatorInputCount.One}>
                <SingleInputField
                    value={values?.filterValue}
                    inputType={inputType}
                    handleChange={handlePrimaryValueChange}
                    ariaLabel={`${filterContext} value`}
                />
            </IF>
            <IF condition={comparatorInputCount === ComparatorInputCount.Two}>
                <DoubleInputField
                    values={values}
                    inputType={inputType}
                    handleChange={valueOnChange}
                    label1="from"
                    label2="to"
                    className="grid-double-input"
                    filterContext={filterContext}
                />
            </IF>
        </div>
    )
}

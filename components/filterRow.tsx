import React, { FC } from "react";
import { IF } from "../../../../atomic/if/if";
import { InputType } from "../filterEnums";
import { FilterRowProps } from "../filterInterfaces";
import { ComparatorOptions } from "./comparatorOptions";
import { InputCoordinator } from "./inputCoordinator";

export const FilterRow: FC<FilterRowProps> = ({
    inputType,
    comparator,
    values,
    className,
    comparatorOptions,
    valueOnChange,
    comparatorOnChange,
    clearRow,
    clearButtonAriaLabel,
    filterContext
}) => {
    return (
        <div className={`grid-filter-row ${className ?? ""}`}>
            <div className="grid-filter-row-fields">
                <IF condition={inputType !== InputType.Checkbox}>
                    <ComparatorOptions
                        comparator={comparator}
                        comparatorOptions={comparatorOptions}
                        comparatorOnChange={comparatorOnChange}
                        ariaLabel={`Choose how to filter ${filterContext}`}
                    />
                </IF>
                <InputCoordinator
                    inputType={inputType}
                    comparator={comparator}
                    values={values}
                    valueOnChange={valueOnChange}
                    className="grid-filter-input-coordinator"
                    filterContext={filterContext}
                />
            </div>
            <IF condition={inputType !== InputType.Checkbox}>
                <button
                    type="button"
                    className="grid-filter-row-clear"
                    onClick={clearRow}
                    aria-label={clearButtonAriaLabel ?? "Clear filter row"}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </IF>
        </div>
    )
}

import React, { ChangeEvent, FC } from "react";
import { getComparatorTitle } from "../config/comparatorDefinitions";
import { Comparator } from "../filterEnums";
import { ComparatorOptionProps } from "../filterInterfaces";

export const ComparatorOptions: FC<ComparatorOptionProps> = ({ comparator, comparatorOnChange, comparatorOptions, ariaLabel }) => {
    const handleChange = ({ currentTarget }: ChangeEvent<HTMLSelectElement>) => {
        comparatorOnChange(Number(currentTarget.value) as Comparator);
    }

    return (
        <div className="grid-filter-options">
            <select value={comparator} onChange={handleChange} aria-label={ariaLabel}>
                {comparatorOptions.map(comparatorOption => (
                    <option
                        key={comparatorOption}
                        value={comparatorOption}>
                        {getComparatorTitle(comparatorOption)}
                    </option>
                ))}
            </select>
        </div>
    )
}

import React, { ChangeEvent, FC } from "react";
import { FilterActionType, Operator } from "../filterEnums";
import { OperatorOptionProps } from "../filterInterfaces";

export const OperatorOption: FC<OperatorOptionProps> = ({ dispatch, operator, operatorGroupId }) => {
    const andOperatorId = `and-operator-${operatorGroupId}`;
    const orOperatorId = `or-operator-${operatorGroupId}`;
    const operatorName = `filter-operator-${operatorGroupId}`;

    const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FilterActionType.OperatorChanged,
            operator: Number(currentTarget.value) as Operator
        });
    }

    return (
        <fieldset className="grid-filter-operator-option">
            <legend className="grid-filter-sr-only">expand filter with and/or</legend>
            <input
                type="radio"
                name={operatorName}
                className="grid-filter-operator"
                id={andOperatorId}
                value={Operator.And}
                onChange={handleChange}
                checked={operator === Operator.And}
            />
            <label htmlFor={andOperatorId} className="grid-operator-label">AND</label>
            <input
                type="radio"
                name={operatorName}
                className="grid-filter-operator"
                id={orOperatorId}
                value={Operator.Or}
                onChange={handleChange}
                checked={operator === Operator.Or}
            />
            <label htmlFor={orOperatorId} className="grid-operator-label">OR</label>
        </fieldset>
    )
}

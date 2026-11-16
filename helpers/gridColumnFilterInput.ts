import { ValueKey } from "../filterEnums";
import { FilterValueChangeHandler, FilterValueKeyChangeHandler } from "../filterInterfaces";

export const createValueChangeHandler = (
    handleChange: FilterValueKeyChangeHandler,
    valueKey: ValueKey
): FilterValueChangeHandler => {
    return function onValueChanged(value) {
        handleChange(value, valueKey);
    }
}

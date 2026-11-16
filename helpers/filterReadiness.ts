import { Comparator } from "../filterEnums";
import { FilterInputValue, IFilterValues } from "../filterInterfaces";
import { isNoArgumentComparator, isOneArgumentComparator, isTwoArgumentComparator } from "../config/comparatorDefinitions";

export const hasFilterInputValue = (value: FilterInputValue | undefined): boolean => {
    if (value == null) return false;
    if (typeof value === "string") return value.length > 0;
    return true;
}

export const getIsFilterReadyToBuild = (
    comparator: Comparator,
    filterValues: IFilterValues
): boolean => {
    const isNoArgument = isNoArgumentComparator(comparator);
    const isOneArgument = isOneArgumentComparator(comparator);
    const isTwoArgument = isTwoArgumentComparator(comparator);

    const hasFilterValues = !!filterValues;
    const hasPrimaryFilterValue = hasFilterValues && hasFilterInputValue(filterValues.filterValue);
    const hasSecondaryFilterValue = hasFilterValues && hasFilterInputValue(filterValues.filterToValue);

    const isOneArgumentComplete = isOneArgument && hasPrimaryFilterValue;
    const isTwoArgumentComplete = isTwoArgument && hasPrimaryFilterValue && hasSecondaryFilterValue;

    const areFilterValuesComplete = isNoArgument || isOneArgumentComplete || isTwoArgumentComplete;
    return areFilterValuesComplete;
}

import { IFilterState } from "../state/gridColumnFilterReducer";
import { INamedColumnFilter } from "../filterInterfaces";
import { IColumnFilter, IGridFilter } from "../model/filterModel";
import { getIsFilterReadyToBuild } from "./filterReadinessHelper";

type FilterValuePrimitive = number | string | Date | boolean | null | undefined;

const areFilterValuesEqual = (previousValue: FilterValuePrimitive, nextValue: FilterValuePrimitive): boolean => {
    if (previousValue instanceof Date && nextValue instanceof Date) {
        return previousValue.getTime() === nextValue.getTime();
    }

    return previousValue === nextValue;
}

const isConditionUnchanged = (previousCondition: IGridFilter, nextCondition: IGridFilter): boolean => {
    return (
        previousCondition.filterType === nextCondition.filterType
        && previousCondition.comparator === nextCondition.comparator
        && areFilterValuesEqual(previousCondition.filter?.value, nextCondition.filter?.value)
        && areFilterValuesEqual(previousCondition.filterTo?.value, nextCondition.filterTo?.value)
    );
}

const isColumnFilterUnchanged = (previousFilter: IColumnFilter, nextFilter: IColumnFilter): boolean => {
    if (previousFilter.filterType !== nextFilter.filterType) return false;
    if (previousFilter.operator !== nextFilter.operator) return false;
    if (previousFilter.conditions.length !== nextFilter.conditions.length) return false;

    for (let i = 0; i < previousFilter.conditions.length; i++) {
        if (!isConditionUnchanged(previousFilter.conditions[i], nextFilter.conditions[i])) return false;
    }

    return true;
}

export const isFilterOutputUnchanged = (
    previousOutput: INamedColumnFilter | null,
    nextOutput: INamedColumnFilter | null
): boolean => {
    if (previousOutput == null || nextOutput == null) return previousOutput === nextOutput;
    if (previousOutput.columnName !== nextOutput.columnName) return false;
    return isColumnFilterUnchanged(previousOutput.filters, nextOutput.filters);
}

export const isFirstFilterRowComplete = (filterState: IFilterState): boolean => {
    return getIsFilterReadyToBuild(filterState.comparators.first, filterState.values.first);
}

export const shouldShowSecondFilterRow = (filterState: IFilterState): boolean => {
    return filterState.operator != null;
}

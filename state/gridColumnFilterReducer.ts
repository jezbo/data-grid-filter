import { FilterActionType, Comparator, FilterIndex, ValueKey, Operator } from "../filterEnums";
import { FilterInputValue, IFilterValues } from "../filterInterfaces";
import { isNoArgumentComparator, isOneArgumentComparator, isTwoArgumentComparator } from "../config/comparatorDefinitions";
import { getIsFilterReadyToBuild } from "../helpers/filterReadiness";

export interface IFilterState {
    defaultComparator: Comparator;
    firstRowVersion: number;
    comparators: {
        first: Comparator;
        second?: Comparator;
    };
    values: {
        first: IFilterValues;
        second?: IFilterValues;
    };
    operator: Operator | null;
}

export type FilterAction =
    |{ type: FilterActionType.ComparatorChanged; index: FilterIndex; comparator: Comparator }
    |{ type: FilterActionType.ValueChanged; index: FilterIndex; key: ValueKey; value: FilterInputValue }
    |{ type: FilterActionType.OperatorChanged; operator: Operator }
    |{ type: FilterActionType.ClearRow; index: FilterIndex }
    |{ type: FilterActionType.Reset }
    |{ type: FilterActionType.FilterModalClosed };

export const createInitialFilterState = (defaultComparator: Comparator): IFilterState => {
    return {
        defaultComparator,
        firstRowVersion: 0,
        comparators: { first: defaultComparator },
        values: { first: {} },
        operator: null
    };
}

const resetFilterState = (state: IFilterState): IFilterState => {
    return {
        ...state,
        firstRowVersion: state.firstRowVersion + 1,
        comparators: { first: state.defaultComparator },
        values: { first: {} },
        operator: null
    };
}

const getFilterValuesKey = (index: FilterIndex): "first" | "second" => {
    return index === FilterIndex.first ? "first" : "second";
}

const updateOperator = (state: IFilterState, operator: Operator): IFilterState => {
    const comparators = { ...state.comparators };

    if (comparators.second == null) comparators.second = state.defaultComparator;

    return {
        ...state,
        comparators,
        operator
    };
}

const updateComparatorAtIndex = (
    state: IFilterState,
    index: FilterIndex,
    comparator: Comparator
): IFilterState => {
    const comparators = { ...state.comparators };
    const filterValuesKey = getFilterValuesKey(index);
    comparators[filterValuesKey] = comparator;

    const filterValues = { ...state.values };
    const currentValues = filterValues[filterValuesKey] ?? {} as IFilterValues;

    if (isNoArgumentComparator(comparator)) filterValues[filterValuesKey] = {};
    else if (isOneArgumentComparator(comparator)) {
        filterValues[filterValuesKey] = {
            filterValue: currentValues.filterValue ?? ""
        };
    }
    else if (isTwoArgumentComparator(comparator)) {
        filterValues[filterValuesKey] = {
            filterValue: currentValues.filterValue ?? "",
            filterToValue: currentValues.filterToValue ?? ""
        };
    }

    return {
        ...state,
        comparators,
        values: filterValues
    };
}

const updateValueAtIndex = (
    state: IFilterState,
    index: FilterIndex,
    key: ValueKey,
    value: FilterInputValue
): IFilterState => {
    const filterValues = { ...state.values };
    const filterValuesKey = getFilterValuesKey(index);
    const currentValues = filterValues[filterValuesKey] ?? {} as IFilterValues;

    const valueProperty = ValueKey[key] as keyof IFilterValues;

    filterValues[filterValuesKey] = {
        ...currentValues,
        [valueProperty]: value
    };

    return {
        ...state,
        values: filterValues
    };
}

const clearRowAtIndex = (state: IFilterState, index: FilterIndex): IFilterState => {
    if (index === FilterIndex.first) {
        if (state.comparators.second == null) return resetFilterState(state);

        return {
            ...state,
            firstRowVersion: state.firstRowVersion + 1,
            comparators: { first: state.comparators.second },
            values: { first: state.values.second ?? {} },
            operator: null
        };
    }

    return {
        ...state,
        comparators: { first: state.comparators.first },
        values: { first: state.values.first },
        operator: null
    };
}

const promoteSecondFilterOnClose = (state: IFilterState) => {
    const secondComparator = state.comparators.second;
    if (state.operator != null && secondComparator != null
        && !getIsFilterReadyToBuild(state.comparators.first, state.values.first)
        && getIsFilterReadyToBuild(secondComparator, state.values.second ?? {})) {
        return clearRowAtIndex(state, FilterIndex.first);
    }
    return state;
}

export const filterReducer = (state: IFilterState, action: FilterAction): IFilterState => {
    if (action.type === FilterActionType.FilterModalClosed) {
        return promoteSecondFilterOnClose(state);
    }

    if (action.type === FilterActionType.Reset) {
        return resetFilterState(state);
    }

    if (action.type === FilterActionType.OperatorChanged) {
        return updateOperator(state, action.operator);
    }

    if (action.type === FilterActionType.ComparatorChanged) {
        return updateComparatorAtIndex(state, action.index, action.comparator);
    }

    if (action.type === FilterActionType.ValueChanged) {
        return updateValueAtIndex(state, action.index, action.key, action.value);
    }

    if (action.type === FilterActionType.ClearRow) {
        return clearRowAtIndex(state, action.index);
    }

    return state;
}

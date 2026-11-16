import { Dispatch, useMemo } from "react";
import { FilterAction } from "../state/gridColumnFilterReducer";
import { FilterActionType, FilterIndex } from "../filterEnums";
import { ComparatorChangeHandler, FilterValueKeyChangeHandler, IFilterRowDispatcherMap, IFilterRowDispatchers } from "../filterInterfaces";

const createFilterRowDispatchers = (
    dispatch: Dispatch<FilterAction>,
    index: FilterIndex
): IFilterRowDispatchers => {
    const valueOnChange: FilterValueKeyChangeHandler = (value, valueKey) => {
        dispatch({ type: FilterActionType.ValueChanged, index, key: valueKey, value });
    };

    const comparatorOnChange: ComparatorChangeHandler = (comparator) => {
        dispatch({ type: FilterActionType.ComparatorChanged, index, comparator });
    };

    const clearRow = () => {
        dispatch({ type: FilterActionType.ClearRow, index });
    }

    return {
        valueOnChange,
        comparatorOnChange,
        clearRow
    };
}

export const useFilterRowDispatchers = (dispatch: Dispatch<FilterAction>): IFilterRowDispatcherMap => {
    return useMemo(() => {
        return {
            first: createFilterRowDispatchers(dispatch, FilterIndex.first),
            second: createFilterRowDispatchers(dispatch, FilterIndex.second)
        };
    }, [dispatch]);
}

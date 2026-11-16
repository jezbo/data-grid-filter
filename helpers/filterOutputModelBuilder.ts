import { Comparator } from "../filterEnums";
import { FilterConversionFunction, IFilterType, IFilterValues, INamedColumnFilter } from "../filterInterfaces";
import { IGridFilter } from "../model/filterModel";
import { IFilterState } from "../state/gridColumnFilterReducer";
import { buildColumnFilter, buildGridFilter } from "./filterBuild";
import { getIsFilterReadyToBuild } from "./filterReadiness";
import { shouldShowSecondFilterRow } from "./filterOutput";

const buildCompletedGridFilter = (
    values: IFilterValues,
    comparator: Comparator,
    filterType: IFilterType,
    conversionFunction: FilterConversionFunction | null
): IGridFilter | null => {
    if (!getIsFilterReadyToBuild(comparator, values)) return null;
    return buildGridFilter(values, comparator, filterType, conversionFunction);
}

const getCompletedGridFilters = (
    filterState: IFilterState,
    filterType: IFilterType,
    conversionFunction: FilterConversionFunction | null
): IGridFilter[] => {
    const completedFilters: IGridFilter[] = [];

    const firstFilter = buildCompletedGridFilter(
        filterState.values.first,
        filterState.comparators.first,
        filterType,
        conversionFunction
    );

    if (firstFilter != null) completedFilters.push(firstFilter);

    const canApplySecondFilterRow = shouldShowSecondFilterRow(filterState) && filterState.comparators.second != null;

    if (canApplySecondFilterRow) {
        const secondFilter = buildCompletedGridFilter(
            filterState.values.second ?? {},
            filterState.comparators.second,
            filterType,
            conversionFunction
        );

        if (secondFilter != null) completedFilters.push(secondFilter);
    }

    return completedFilters;
}

export const buildNextFilterModel = (
    columnName: string,
    filterState: IFilterState,
    filterType: IFilterType,
    conversionFunction: FilterConversionFunction | null
): INamedColumnFilter | null => {
    const completedFilters = getCompletedGridFilters(filterState, filterType, conversionFunction);
    if (completedFilters.length === 0) return null;

    return {
        columnName,
        filters: buildColumnFilter(filterType.apiInputType, filterState.operator, completedFilters)
    };
}

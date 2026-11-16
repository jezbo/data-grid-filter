import { IGridFilter, IColumnFilter, FilterValue } from "../model/filterModel";
import { Comparator, InputType, Operator } from "../filterEnums";
import { FilterConversionFunction, IFilterType, IFilterValues } from "../filterInterfaces";
import { hasFilterInputValue } from "./filterReadiness";

const buildTextFilter = (
    filterValues: IFilterValues,
    comparator: Comparator
): IGridFilter => {
    const result = {} as IGridFilter;
    result.filterType = InputType.Text;
    result.comparator = comparator;
    if (!!filterValues && hasFilterInputValue(filterValues.filterValue)) {
        result.filter = new FilterValue(String(filterValues.filterValue));
    }

    return result;
}

const buildNumberFilter = (
    filterValues: IFilterValues,
    comparator: Comparator
): IGridFilter => {
    const result = {} as IGridFilter;
    result.filterType = InputType.Number;
    result.comparator = comparator;
    if (!!filterValues && hasFilterInputValue(filterValues.filterValue))
        result.filter = new FilterValue(Number(filterValues.filterValue));
    if (!!filterValues && hasFilterInputValue(filterValues.filterToValue))
        result.filterTo = new FilterValue(Number(filterValues.filterToValue));
    return result;
}

const buildDateFilter = (
    filterValues: IFilterValues,
    comparator: Comparator
): IGridFilter => {
    const result = {} as IGridFilter;
    result.filterType = InputType.Date;
    result.comparator = comparator;
    if (!!filterValues && hasFilterInputValue(filterValues.filterValue))
        result.filter = new FilterValue(new Date(String(filterValues.filterValue)));
    if (!!filterValues && hasFilterInputValue(filterValues.filterToValue))
        result.filterTo = new FilterValue(new Date(String(filterValues.filterToValue)));
    return result;
}

const buildBooleanFilter = (
    filterValues: IFilterValues,
    comparator: Comparator
): IGridFilter => {
    const result = {} as IGridFilter;
    result.filterType = InputType.Checkbox;
    result.comparator = comparator;

    const rawFilterValue = filterValues?.filterValue;
    const hasBooleanFilterValue = hasFilterInputValue(rawFilterValue);

    if (!hasBooleanFilterValue) return result;

    const isBooleanValue = typeof rawFilterValue === "boolean";
    const booleanFilterValue = isBooleanValue
        ? rawFilterValue
        : String(rawFilterValue).toLowerCase() === "true";

    result.filter = new FilterValue(booleanFilterValue);

    return result;
}

const buildTextListFilter = (
    filterValues: IFilterValues,
    comparator: Comparator
): IGridFilter => {
    const result = {} as IGridFilter;
    result.filterType = InputType.TextList;
    result.comparator = comparator;
    if (!!filterValues && hasFilterInputValue(filterValues.filterValue)) result.filter = new FilterValue(String(filterValues.filterValue));
    return result;
}

export const buildGridFilter = (
    filterValue: IFilterValues,
    comparator: Comparator,
    filterType: IFilterType,
    conversionFunction?: FilterConversionFunction | null
): IGridFilter => {
    let result = {} as IGridFilter;

    //convert filterValue types if required (e.g. is number in db and text in grid)
    const buildFilterValues = filterType.isConvert && conversionFunction ? conversionFunction(filterValue) : filterValue;
    if (filterType.apiInputType === InputType.Text)
        result = buildTextFilter(buildFilterValues, comparator);
    else if (filterType.apiInputType === InputType.Number)
        result = buildNumberFilter(buildFilterValues, comparator);
    else if (filterType.apiInputType === InputType.Date)
        result = buildDateFilter(buildFilterValues, comparator);
    else if (filterType.apiInputType === InputType.Checkbox)
        result = buildBooleanFilter(buildFilterValues, comparator);
    else if (filterType.apiInputType === InputType.TextList)
        result = buildTextListFilter(buildFilterValues, comparator);
    else throw new TypeError("Grid: filterType not supported");
    return result;
}

export const buildColumnFilter = (
    filterType: InputType,
    operator: Operator | null,
    conditions: IGridFilter[]
): IColumnFilter => {
    const result = {} as IColumnFilter;
    const shouldIncludeOperator = operator != null && conditions.length === 2;
    result.filterType = filterType;
    if (shouldIncludeOperator) result.operator = operator;
    result.conditions = conditions;

    return result;
}

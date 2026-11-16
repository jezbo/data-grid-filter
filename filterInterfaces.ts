import { IFilterParams } from "ag-grid-community";
import { Dispatch } from "react";
import { Comparator, ComparatorInputCount, InputType, Operator, ValueKey } from "./filterEnums";
import { IColumnFilter } from "./model/filterModel";
import { FilterAction } from "./state/gridColumnFilterReducer";

export type FilterInputValue = string | boolean | null;
export type FilterValueChangeHandler = (value: FilterInputValue) => void;
export type FilterValueKeyChangeHandler = (value: FilterInputValue, key: ValueKey) => void;
export type ComparatorChangeHandler = (comparator: Comparator) => void;

export interface IFilterValues {
    filterValue?: FilterInputValue;
    filterToValue?: FilterInputValue;
}

export interface INamedColumnFilter {
    columnName: string;
    filters: IColumnFilter;
}

export interface IFilterType {
    userInputType: InputType;
    apiInputType: InputType;
    comparatorPackage: Comparator[];
    isConvert: boolean;
    isBooleanOnlyLogic: boolean;
}

export type FilterConversionFunction = (filterValues: IFilterValues) => IFilterValues;

export interface GridColumnFilterProps extends IFilterParams {
    filterType: IFilterType;
    setFilterModel: (filters: INamedColumnFilter | null) => void;
}

export interface IComparator {
    title: string;
    inputCount: ComparatorInputCount;
    supportedInputTypes: InputType[];
}

export interface IFilterRowDispatchers {
    valueOnChange: FilterValueKeyChangeHandler;
    comparatorOnChange: ComparatorChangeHandler;
    clearRow: () => void;
}

export interface IFilterRowDispatcherMap {
    first: IFilterRowDispatchers;
    second: IFilterRowDispatchers;
}

export interface ComparatorOptionProps {
    comparator?: Comparator;
    comparatorOptions: Comparator[];
    comparatorOnChange: ComparatorChangeHandler;
    ariaLabel: string;
}

export interface SingleInputFieldProps {
    value?: FilterInputValue;
    inputType: InputType;
    handleChange: FilterValueChangeHandler;
    className?: string;
    label?: string;
    ariaLabel: string;
}

export interface DoubleInputProps {
    values?: IFilterValues;
    inputType: InputType;
    handleChange: FilterValueKeyChangeHandler;
    label1?: string;
    label2?: string;
    className?: string;
    filterContext: string;
}

export interface InputCoordinatorProps {
    inputType: InputType;
    comparator?: Comparator;
    values?: IFilterValues;
    valueOnChange: FilterValueKeyChangeHandler;
    className?: string;
    filterContext: string;
}

export interface FilterRowProps extends Omit<ComparatorOptionProps, "ariaLabel">, InputCoordinatorProps {
    clearRow: () => void;
    clearButtonAriaLabel?: string;
    className?: string;
}

export interface OperatorOptionProps {
    dispatch: Dispatch<FilterAction>;
    operator: Operator | null;
    operatorGroupId: string;
}

export interface ClearThisFilterProps {
    onClear: () => void;
}

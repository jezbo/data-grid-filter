import { Comparator, InputType, Operator } from "../filterEnums";

export interface IBaseGridFilter {
    filterType: InputType;
    comparator?: Comparator;
}

export class FilterValue {
    public value: number | string | Date | boolean;
    public intValue: number | null;
    public stringValue: string | null;
    public dateTimeValue: Date | null;
    public booleanValue: boolean | null;

    constructor(value: number | string | Date | boolean) {
        this.value = value;
        this.intValue = typeof value === 'number' ? value : null;
        this.stringValue = typeof value === 'string' ? value : null;
        this.dateTimeValue = value instanceof Date ? value : null;
        this.booleanValue = typeof value === 'boolean' ? value : null;
    }
}

export interface IGridFilter extends IBaseGridFilter {
    filter?: FilterValue;
    filterTo?: FilterValue;
}

export interface IColumnFilter {
    filterType: InputType;
    operator?: Operator;
    conditions: IGridFilter[];
}

export interface IFilterModel {
    [key: string]: IColumnFilter;
}

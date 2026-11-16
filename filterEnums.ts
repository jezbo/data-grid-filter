export enum InputType {
    Text,
    Number,
    Date,
    DateTime,
    Checkbox,
    TextList
}

export enum Operator {
    And,
    Or
}

export enum ValueKey {
    filterValue,
    filterToValue //for range filtering eg between two dates
}

export enum StateChangeType {
    operator,
    comparator,
    inputValues
}

export enum FilterActionType {
    ComparatorChanged,
    ValueChanged,
    OperatorChanged,
    ClearRow,
    Reset,
    FilterModalClosed
}

export enum FilterIndex {
    first,
    second
}

export enum SortDirection {
    Ascending,
    Descending
}

export enum Comparator {
    Contains,
    NotContains,
    Equal,
    NotEqual,
    StartsWith,
    EndsWith,
    Blank,
    NotBlank,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
    InRange,
    ListContains,
    IsListEmpty,
    IsListNotEmpty
}

export enum ComparatorInputCount {
    Zero,
    One,
    Two
}



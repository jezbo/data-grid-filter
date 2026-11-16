import { Comparator, ComparatorInputCount, InputType } from "../filterEnums";
import { IComparator } from "../filterInterfaces";

export const comparatorReference: Record<Comparator, IComparator> = {
    [Comparator.Contains]: {
        title: "Contains",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text]
    },
    [Comparator.NotContains]: {
        title: "Not Contains",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text]
    },
    [Comparator.Equal]: {
        title: "Equal",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text, InputType.Number, InputType.Date, InputType.DateTime, InputType.Checkbox]
    },
    [Comparator.NotEqual]: {
        title: "Not Equal",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text, InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.StartsWith]: {
        title: "Starts With",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text]
    },
    [Comparator.EndsWith]: {
        title: "Ends With",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Text]
    },
    [Comparator.Blank]: {
        title: "Blank",
        inputCount: ComparatorInputCount.Zero,
        supportedInputTypes: [InputType.Text, InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.NotBlank]: {
        title: "Not Blank",
        inputCount: ComparatorInputCount.Zero,
        supportedInputTypes: [InputType.Text, InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.GreaterThan]: {
        title: "Greater Than",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.GreaterThanOrEqual]: {
        title: "Greater Than Or Equal",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.LessThan]: {
        title: "Less Than",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.LessThanOrEqual]: {
        title: "Less Than Or Equal",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.InRange]: {
        title: "In Range",
        inputCount: ComparatorInputCount.Two,
        supportedInputTypes: [InputType.Number, InputType.Date, InputType.DateTime]
    },
    [Comparator.ListContains]: {
        title: "List Contains",
        inputCount: ComparatorInputCount.One,
        supportedInputTypes: [InputType.TextList]
    },
    [Comparator.IsListEmpty]: {
        title: "Is List Empty",
        inputCount: ComparatorInputCount.Zero,
        supportedInputTypes: [InputType.TextList]
    },
    [Comparator.IsListNotEmpty]: {
        title: "Is List Not Empty",
        inputCount: ComparatorInputCount.Zero,
        supportedInputTypes: [InputType.TextList]
    }
};

export const getComparatorDefinition = (comparator: Comparator): IComparator => {
    const definition = comparatorReference[comparator];

    if (!definition) {
        throw new Error(`Grid: comparator definition not found for '${Comparator[comparator] ?? comparator}'`);
    }

    return definition;
};

export const getComparatorInputCount = (comparator: Comparator): ComparatorInputCount => {
    const definition = getComparatorDefinition(comparator);
    return definition.inputCount;
};

export const getComparatorTitle = (comparator: Comparator): string => {
    const definition = getComparatorDefinition(comparator);
    return definition.title;
};

export const isNoArgumentComparator = (comparator: Comparator): boolean =>
    getComparatorInputCount(comparator) === ComparatorInputCount.Zero;

export const isOneArgumentComparator = (comparator: Comparator): boolean =>
    getComparatorInputCount(comparator) === ComparatorInputCount.One;

export const isTwoArgumentComparator = (comparator: Comparator): boolean =>
    getComparatorInputCount(comparator) === ComparatorInputCount.Two;

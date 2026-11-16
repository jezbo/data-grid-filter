import { Comparator, InputType } from "../filterEnums"
import { IFilterType } from "../filterInterfaces";
import { ComparatorPackages } from "./comparatorPackages";

const createFilterType = (
    userInputType: InputType,
    comparatorPackage: Comparator[],
    isBooleanOnlyLogic: boolean,
    apiInputType?: InputType,
): IFilterType => {
    const result = {} as IFilterType;
    result.userInputType = userInputType;
    result.comparatorPackage = comparatorPackage;
    result.apiInputType = !!apiInputType ? apiInputType : userInputType;
    result.isConvert = result.userInputType !== result.apiInputType;
    result.isBooleanOnlyLogic = isBooleanOnlyLogic;
    return result;
}

export const FilterTypes = {
    Text: createFilterType(InputType.Text, ComparatorPackages.text, false),
    Date: createFilterType(InputType.Date, ComparatorPackages.date, false),
    Number: createFilterType(InputType.Number, ComparatorPackages.number, false),
    TextToNumber: createFilterType(InputType.Text, ComparatorPackages.base, false, InputType.Number),
    Boolean: createFilterType(InputType.Checkbox, ComparatorPackages.boolean, true),
    TextList: createFilterType(InputType.Text, ComparatorPackages.list, false, InputType.TextList)
}

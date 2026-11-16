import { Dispatch } from "react";
import { useGridFilter } from "ag-grid-react";
import { FilterActionType } from "../filterEnums";
import { FilterAction } from "../state/gridColumnFilterReducer";

const doesFilterPass = () => true;

export const useFilterModalClose = (dispatch: Dispatch<FilterAction>): void => {
    useGridFilter({
        doesFilterPass,
        afterGuiDetached: () => dispatch({ type: FilterActionType.FilterModalClosed })
    });
}

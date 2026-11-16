import React, { useLayoutEffect, useReducer, useRef } from "react";
import { FilterConversionFunction, GridColumnFilterProps } from "./filterInterfaces";
import "./styles/filter.css";
import { Comparator, FilterActionType } from "./filterEnums";
import { IF } from "../../../atomic/if/if";
import { filterReducer, createInitialFilterState } from "./state/gridColumnFilterReducer";
import { isFirstFilterRowComplete, shouldShowSecondFilterRow } from "./helpers/filterOutputHelper";
import { useFilterEmission, useFilterModalClose, useFilterRowDispatchers } from "./hooks";
import { ClearThisFilter, FilterRow, OperatorOption } from "./components";

const InnerGridColumnFilter: React.FC<GridColumnFilterProps & { comparatorOptions: Comparator[] }> = ({
    filterType,
    setFilterModel,
    colDef,
    comparatorOptions
}) => {
    const [filterState, dispatch] = useReducer(filterReducer, createInitialFilterState(comparatorOptions[0]))
    const rowDispatchers = useFilterRowDispatchers(dispatch);
    const filterContainerRef = useRef<HTMLDivElement>(null);
    const focusAfterClearRef = useRef(false);
    const columnLabel = colDef.headerName || colDef.field || colDef.colId || "column";

    useFilterModalClose(dispatch);

    useLayoutEffect(() => {
        if (!focusAfterClearRef.current) return;
        focusAfterClearRef.current = false;
        filterContainerRef.current?.querySelector<HTMLElement>(".grid-filter-row-first select, .grid-filter-row-first input")?.focus();
    }, [filterState]);

    const clearAndRestoreFocus = (clear: () => void) => {
        focusAfterClearRef.current = true;
        clear();
    };

    const conversionFunctionFromColDef: FilterConversionFunction | null = colDef.filterParams?.conversionFunction ?? null;
    const conversionFunction: FilterConversionFunction | null = filterType.isConvert ? conversionFunctionFromColDef : null;

    const operatorGroupIdFromColId = colDef.colId;
    const operatorGroupIdFromField = colDef.field;
    const operatorGroupId = operatorGroupIdFromColId || operatorGroupIdFromField || "default";

    const isBooleanOnlyLogic = filterType.isBooleanOnlyLogic;
    const shouldShowSecondRow = shouldShowSecondFilterRow(filterState);
    const shouldShowOperator = isFirstFilterRowComplete(filterState) || shouldShowSecondRow;

    useFilterEmission({
        columnName: colDef.field,
        filterState,
        filterType,
        conversionFunction,
        setFilterModel
    });

    return (
        <div ref={filterContainerRef} className={`grid-filter-container${isBooleanOnlyLogic ? " grid-filter-boolean" : ""}`}>
            <div className="grid-filter">
                <FilterRow
                    key={filterState.firstRowVersion}
                    comparator={filterState.comparators.first}
                    values={filterState.values.first}
                    valueOnChange={rowDispatchers.first.valueOnChange}
                    comparatorOnChange={rowDispatchers.first.comparatorOnChange}
                    clearRow={() => clearAndRestoreFocus(rowDispatchers.first.clearRow)}
                    clearButtonAriaLabel="Clear first filter row"
                    filterContext={`${columnLabel} first filter condition`}
                    inputType={filterType.userInputType}
                    comparatorOptions={comparatorOptions}
                    className="grid-filter-row-first"
                />
                <IF condition={!isBooleanOnlyLogic && shouldShowOperator}>
                    <div className="grid-filter-operator-row">
                        <OperatorOption
                            operator={filterState.operator}
                            dispatch={dispatch}
                            operatorGroupId={operatorGroupId}
                        />
                    </div>
                </IF>
                <IF condition={shouldShowSecondRow && !isBooleanOnlyLogic}>
                    <FilterRow
                        comparator={filterState.comparators.second}
                        values={filterState.values.second}
                        valueOnChange={rowDispatchers.second.valueOnChange}
                        comparatorOnChange={rowDispatchers.second.comparatorOnChange}
                        clearRow={() => clearAndRestoreFocus(rowDispatchers.second.clearRow)}
                        clearButtonAriaLabel="Clear second filter row"
                        filterContext={`${columnLabel} second filter condition`}
                        inputType={filterType.userInputType}
                        comparatorOptions={comparatorOptions}
                        className="grid-filter-row-second"
                    />
                </IF>
            </div>
            <IF condition={shouldShowSecondRow && !isBooleanOnlyLogic}>
                <ClearThisFilter onClear={() => clearAndRestoreFocus(() => dispatch({ type: FilterActionType.Reset }))} />
            </IF>
        </div>
    )
}

export const GridColumnFilter: React.FC<GridColumnFilterProps> = (props) => {
    const comparatorOptions = props.filterType.comparatorPackage;

    if (comparatorOptions.length === 0) return null;

    return <InnerGridColumnFilter {...props} comparatorOptions={comparatorOptions} />;
}

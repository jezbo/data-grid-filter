import { useEffect, useRef } from "react";
import { IFilterState } from "../state/gridColumnFilterReducer";
import { FilterConversionFunction, IFilterType, INamedColumnFilter } from "../filterInterfaces";
import { buildNextFilterModel } from "../helpers/filterOutputModelBuilder";
import { isFilterOutputUnchanged } from "../helpers/filterOutput";

interface UseFilterEmissionProps {
    columnName?: string;
    filterState: IFilterState;
    filterType: IFilterType;
    conversionFunction: FilterConversionFunction | null;
    setFilterModel: (filters: INamedColumnFilter | null) => void;
}

export const useFilterEmission = ({
    columnName,
    filterState,
    filterType,
    conversionFunction,
    setFilterModel
}: UseFilterEmissionProps) => {
    const lastEmittedFilterRef = useRef<INamedColumnFilter | null>(null);

    useEffect(() => {
        if (!columnName) return;

        const nextFilterOutput = buildNextFilterModel(
            columnName,
            filterState,
            filterType,
            conversionFunction
        );

        const isFilterOutputAlreadyEmitted = isFilterOutputUnchanged(nextFilterOutput, lastEmittedFilterRef.current);
        if (isFilterOutputAlreadyEmitted) return;

        setFilterModel(nextFilterOutput);
        lastEmittedFilterRef.current = nextFilterOutput;
    }, [columnName, conversionFunction, filterState, filterType, setFilterModel]);
}

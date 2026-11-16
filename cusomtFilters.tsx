import React from "react"
import { GridColumnFilter } from "./gridColumnFilter"
import { FilterTypes } from "./config/filterTypes"
import { GridColumnFilterProps } from "./filterInterfaces"

type CustomFilterProps = Omit<GridColumnFilterProps, "filterType">;

export const TextFilter = (props: CustomFilterProps) => {
    const newProps = {...props, filterType: FilterTypes.Text}
    return <GridColumnFilter {...newProps} />
}

export const NumberFilter = (props: CustomFilterProps) => {
    const newProps = { ...props, filterType: FilterTypes.Number }
    return <GridColumnFilter {...newProps} />
}

export const DateFilter = (props: CustomFilterProps) => {
    const newProps = { ...props, filterType: FilterTypes.Date }
    return <GridColumnFilter {...newProps} />
}

export const TextToNumberFilter = (props: CustomFilterProps) => {
    const newProps = { ...props, filterType: FilterTypes.TextToNumber }
    return <GridColumnFilter {...newProps} />
}

export const BooleanFilter = (props: CustomFilterProps) => {
    const newProps = { ...props, filterType: FilterTypes.Boolean }
    return <GridColumnFilter {...newProps} />
}

export const TextListFilter = (props: CustomFilterProps) => {
    const newProps = { ...props, filterType: FilterTypes.TextList }
    return <GridColumnFilter {...newProps} />
}

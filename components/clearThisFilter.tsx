import React, { FC } from "react";
import { icons } from "../../../../../constants/icons/icons";
import { ClearThisFilterProps } from "../filterInterfaces";

export const ClearThisFilter: FC<ClearThisFilterProps> = ({ onClear }) => {
    return (
        <div className="grid-clear-thisfilter-container">
            <button
                type="button"
                className="grid-clear-thisfilter"
                onClick={onClear}
                aria-label="Clear column filter"
            >
                <i className={icons.actions.discard} aria-hidden="true" />
            </button>
        </div>
    )
}

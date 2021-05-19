import React from "react";
import { SelectBaseProps, SelectOptionType } from "./types";
export declare const AsyncSelect: React.ForwardRefExoticComponent<Omit<SelectBaseProps, "withFilter" | "inputActive"> & {
    loadOptions: (inputValue: string, callback: (data: SelectOptionType[]) => void) => Promise<any> | void;
} & React.RefAttributes<HTMLInputElement>>;

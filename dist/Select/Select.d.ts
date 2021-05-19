import React from "react";
import { SelectOptionType } from "./types";
export declare const Select: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref" | "style" | "onChange" | "className" | "value"> & {
    withFilter?: boolean | undefined;
    customFilterFn?: ((option: SelectOptionType) => boolean) | undefined;
    inputActive?: boolean | undefined;
    defaultOption?: SelectOptionType | undefined;
    onChange?: ((option: SelectOptionType | null) => void) | undefined;
    onInputChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    loadingText?: string | undefined;
    notFoundText?: string | undefined;
    errorText?: string | undefined;
    maxItemsPerPage?: number | undefined;
    selectClassname?: string | undefined;
    optionClassname?: string | undefined;
    optionActiveClassName?: string | undefined;
    selectStyle?: React.CSSProperties | undefined;
    optionStyle?: React.CSSProperties | undefined;
    value: SelectOptionType | null;
} & {
    options: SelectOptionType[] | ((inputValue: string) => SelectOptionType[]);
    isLoading?: boolean | undefined;
    hasError?: boolean | undefined;
    notFound?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;

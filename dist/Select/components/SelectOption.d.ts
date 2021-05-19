import { CSSProperties, FC } from "react";
import { SelectOptionType } from "../types";
declare type SelectOptionProps = {
    optionData: SelectOptionType;
    onOptionSelect: (option: SelectOptionType) => void;
    isSelected: boolean;
    className?: string;
    activeClassname?: string;
    style?: CSSProperties;
};
export declare const SelectOption: FC<SelectOptionProps>;
export {};

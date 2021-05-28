/// <reference types="react" />
import { IconType } from "react-icons";
export declare type InputProps = Omit<JSX.IntrinsicElements["input"], "ref"> & {
    showAnimatedName?: boolean;
    icon?: IconType;
    iconPosition?: "left" | "right";
};
export declare const TextInput: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & {
    showAnimatedName?: boolean | undefined;
    icon?: IconType | undefined;
    iconPosition?: "left" | "right" | undefined;
} & import("react").RefAttributes<HTMLInputElement>>;

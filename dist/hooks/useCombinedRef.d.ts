import { ForwardedRef, MutableRefObject } from "react";
export declare function useCombinedRef<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]): (node: T) => void;

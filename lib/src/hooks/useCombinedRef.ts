/* eslint-disable react-hooks/exhaustive-deps */
import { ForwardedRef, MutableRefObject, useCallback } from "react";

export function useCombinedRef<T>(
	...refs: (MutableRefObject<T> | ForwardedRef<T>)[]
) {
	return useCallback((node: T) => {
		for (const ref of refs) {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
			} else ref.current = node;
		}
	}, refs);
}

import React, { ChangeEvent, useCallback } from "react";
import { useState } from "react";
import { Select } from "./Select";
import { SelectBaseProps, SelectOptionType } from "./types";

type AsyncSelectProps = Omit<SelectBaseProps, "withFilter" | "inputActive"> & {
	loadOptions: (
		inputValue: string,
		callback: (data: SelectOptionType[]) => void
	) => Promise<any> | void;
};

export const AsyncSelect = React.forwardRef<HTMLInputElement, AsyncSelectProps>(
	({ loadOptions, onInputChange, ...rest }, ref) => {
		const [options, setOptions] = useState<SelectOptionType[]>([]);
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(false);
		const [notFound, setNotFound] = useState(false);

		const handleLoadOptions = useCallback(
			async (value: string) => {
				try {
					setNotFound(false);
					setError(false);
					setOptions([]);
					setLoading(true);

					await loadOptions(value, data => {
						setOptions(data);
						if (data.length === 0) {
							setNotFound(true);
						}
						setLoading(false);
					});
				} catch (error) {
					setOptions([]);
					setError(true);
					setLoading(false);
				}
			},
			[loadOptions]
		);

		const handleInputChange = useCallback(
			async (e: ChangeEvent<HTMLInputElement>) => {
				if (onInputChange) {
					onInputChange(e);
				}
				await handleLoadOptions(e.target.value);
			},
			[handleLoadOptions, onInputChange]
		);

		return (
			<Select
				ref={ref}
				options={options}
				onInputChange={handleInputChange}
				isLoading={loading}
				hasError={error}
				notFound={notFound}
				withFilter={false}
				inputActive={true}
				{...rest}
			/>
		);
	}
);

AsyncSelect.displayName = "AsyncSelect";

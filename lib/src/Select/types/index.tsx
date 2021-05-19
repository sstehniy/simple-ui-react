export type SelectOptionType = {
	label: string;
	value: string;
	[key: string]: any;
};

export type SelectBaseProps = Omit<
	JSX.IntrinsicElements["input"],
	"onChange" | "ref" | "className" | "style" | "value"
> & {
	withFilter?: boolean;
	customFilterFn?: (option: SelectOptionType) => boolean;
	inputActive?: boolean;
	defaultOption?: SelectOptionType;
	onChange?: (option: SelectOptionType | null) => void;
	onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	loadingText?: string;
	notFoundText?: string;
	errorText?: string;
	maxItemsPerPage?: number;
	selectClassname?: string;
	optionClassname?: string;
	optionActiveClassName?: string;
	selectStyle?: React.CSSProperties;
	optionStyle?: React.CSSProperties;
	value: SelectOptionType | null;
};

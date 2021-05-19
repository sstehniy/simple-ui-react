import { throttle } from "lodash";
import {
	useEffect,
	useRef,
	useState,
	useCallback,
	CSSProperties,
	FC
} from "react";
import { useWindowSize } from "react-use";
import { SelectOptionType } from "../types";

type SelectOptionProps = {
	optionData: SelectOptionType;
	onOptionSelect: (option: SelectOptionType) => void;
	isSelected: boolean;
	className?: string;
	activeClassname?: string;
	style?: CSSProperties;
};

export const SelectOption: FC<SelectOptionProps> = ({
	optionData,
	onOptionSelect,
	isSelected,
	className,
	activeClassname,
	style
}) => {
	const [label, setLabel] = useState(optionData.label);
	const optionRef = useRef<HTMLLIElement>(null);
	const labelRef = useRef<HTMLSpanElement>(null);
	const { width } = useWindowSize();

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && document.activeElement === optionRef.current) {
			onOptionSelect(optionData);
		}
	};

	const getLabel = useCallback(
		// eslint-disable-line
		throttle(() => {
			if (!optionRef.current || !labelRef.current) return;
			const labelWidth = labelRef.current.getBoundingClientRect().width;
			const nodeWidth = optionRef.current.getBoundingClientRect().width;
			const label = optionData.label;

			const coef = (nodeWidth - 5) / labelWidth;
			if (coef < 1) {
				const limitedLabel =
					label
						.substring(0, Math.floor(optionData.label.length * coef) - 2)
						.trim() + "...";
				setLabel(limitedLabel);
			} else setLabel(optionData.label);
		}, 100),
		[optionRef, labelRef, optionData]
	);
	useEffect(() => {
		getLabel();
	}, [width, labelRef, optionRef, getLabel]);

	return (
		<>
			<li
				className={`select-option ${className} ${
					isSelected ? activeClassname || "active" : ""
				}`}
				style={{ ...style }}
				title={optionData.value}
				ref={optionRef}
				onClick={() => onOptionSelect(optionData)}
				tabIndex={0}
				onKeyDown={handleKeyPress}
			>
				<span className="option-label placeholder" ref={labelRef}>
					{optionData.label}
				</span>
				<span className="option-label">{label}</span>
			</li>
			<style jsx>{`
				.select-option {
					position: relative;
					background-color: #fafafa;
					cursor: pointer;
					border-style: solid;
					border-color: #b6b6b6;
					border-width: 0 0 1px 0;
					overflow: hidden;
					padding: 6px;
					font-size: 0.8rem;
					outline-offset: -3px;
				}

				.select-option:last-of-type {
					border: none;
				}

				.select-option:hover {
					background-color: #e4e4e4;
				}

				.select-option.active {
				}

				.option-label {
					white-space: nowrap;
				}

				.option-label.placeholder {
					position: absolute;
					opacity: 0;
				}
			`}</style>
		</>
	);
};

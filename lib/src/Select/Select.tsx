/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
	ChangeEvent,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { SelectOption } from "./components/SelectOption";
import { SelectBaseProps, SelectOptionType } from "./types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _JSXStyle from "styled-jsx/style";
import { useClickAway } from "react-use";

type SelectProps = SelectBaseProps & {
	options: SelectOptionType[] | ((inputValue: string) => SelectOptionType[]);
	isLoading?: boolean;
	hasError?: boolean;
	notFound?: boolean;
};

export const Select = forwardRef<HTMLInputElement, SelectProps>(
	(
		{
			options,
			withFilter = true,
			customFilterFn,
			inputActive = true,
			defaultOption,
			onChange,
			onInputChange,
			isLoading,
			hasError,
			notFound,
			loadingText,
			errorText,
			notFoundText,
			disabled,
			maxItemsPerPage = 5,
			selectClassname,
			selectStyle,
			optionClassname,
			optionActiveClassName,
			optionStyle,
			value,
			...rest
		},
		forwardedRef
	) => {
		const [inputFilter, setInputFilter] = useState("");
		const [selectedOption, setSelectedOption] =
			useState<SelectOptionType | null>(null);
		const [showOptions, setShowOptions] = useState(false);

		const wrapperRef = useRef<HTMLDivElement>(null);
		const inputRef = useRef<HTMLInputElement>(null);
		const listRef = useRef<HTMLUListElement>(null);
		const hiddenInputRef = useRef<HTMLInputElement>(null);

		useClickAway(wrapperRef, () => setShowOptions(false));

		useEffect(() => {
			console.log(_JSXStyle);
		}, []);

		const setHiddenInputRef = useCallback(
			(node: HTMLInputElement) => {
				if (!forwardedRef) return;
				(hiddenInputRef as React.MutableRefObject<HTMLInputElement>).current =
					node;
				if (typeof forwardedRef === "function") {
					forwardedRef(node);
				} else
					(forwardedRef as React.MutableRefObject<HTMLInputElement>).current =
						node;
			},
			[forwardedRef]
		);

		const handleOptionSelect = useCallback(
			(option: SelectOptionType | null) => {
				if (!inputRef.current) return;
				if (onChange) onChange(option);

				setSelectedOption(option);
				setInputFilter(option?.label || "");
				inputRef.current.focus();
				setShowOptions(false);

				if (hiddenInputRef.current) {
					hiddenInputRef.current.value = option?.value || "";
					hiddenInputRef.current.dispatchEvent(new Event("input"));
				}
			},
			[inputRef, onChange]
		);

		useEffect(() => {
			if (!disabled || !inputRef.current) return;
			handleOptionSelect(null);
			inputRef.current.blur();
		}, [disabled, handleOptionSelect, inputRef]);

		useEffect(() => {
			if (!wrapperRef.current || !inputRef.current || disabled === true) return;
			const handleWrapperFocus = () => {
				inputRef.current?.focus();
			};
			const wrapperNode = wrapperRef.current;
			wrapperNode.addEventListener("focus", handleWrapperFocus);
			return () => {
				wrapperNode.removeEventListener("focus", handleWrapperFocus);
			};
		}, [wrapperRef, inputRef, disabled]);

		const optionsToShow = useMemo(() => {
			if (typeof options === "function") {
				return options(inputFilter);
			}
			if (!options.length) return [];
			if (!withFilter) return options;
			const defaultFilterFn = (option: SelectOptionType) => {
				if (inputFilter.includes(" ")) {
					return option.label.toLowerCase().includes(inputFilter.toLowerCase());
				} else {
					return option.label
						.split(" ")
						.some(token =>
							token.toLowerCase().startsWith(inputFilter.toLowerCase())
						);
				}
			};
			const filteredOptions = options.filter(customFilterFn || defaultFilterFn);
			if (defaultOption) {
				return [defaultOption, ...filteredOptions];
			} else return filteredOptions;
		}, [customFilterFn, defaultOption, inputFilter, options, withFilter]);

		const handleToggleShowList = useCallback(() => {
			if (!optionsToShow.length && !showOptions) return;
			setShowOptions(!showOptions);
		}, [optionsToShow.length, showOptions]);

		const handleKeyStrokeInList = useCallback(
			(e: React.KeyboardEvent) => {
				const listEl = listRef.current;
				const currentFocusEl = document.activeElement as HTMLLIElement;
				if (!currentFocusEl || !listEl || !inputRef.current) return;
				const itemsArray = Array.from(listEl.children);
				const currentIndex = itemsArray.indexOf(currentFocusEl);
				if (currentIndex === -1) return;
				switch (e.key) {
					case "ArrowUp": {
						e.preventDefault();
						if (currentIndex === 0) {
							inputRef.current.focus();
						} else {
							const prevListEl = itemsArray[currentIndex - 1] as HTMLLIElement;
							prevListEl.focus();
						}
						break;
					}
					case "ArrowDown": {
						e.preventDefault();
						if (currentIndex === itemsArray.length - 1) {
							inputRef.current.focus();
						} else {
							const nextListEl = itemsArray[currentIndex + 1] as HTMLLIElement;
							nextListEl.focus();
						}
						break;
					}
					case "Escape": {
						e.preventDefault();
						inputRef.current.focus();
						handleToggleShowList();
					}
				}
			},
			[handleToggleShowList, inputRef]
		);

		useEffect(() => {
			if (!wrapperRef.current) return;

			const handleInputKeyStroke = (e: KeyboardEvent) => {
				if (document.activeElement !== inputRef.current) return;

				const handleArrowDownKeyPressed = () => {
					if (!showOptions || !listRef.current || !options.length) return;
					const firstOption = listRef.current.childNodes[0] as HTMLLIElement;
					firstOption.focus();
				};

				switch (e.key) {
					case "Enter": {
						handleToggleShowList();
						break;
					}
					case "ArrowDown": {
						e.preventDefault();
						handleArrowDownKeyPressed();
						break;
					}
				}
			};
			const wrapperNode = wrapperRef.current;
			wrapperNode.addEventListener("keydown", handleInputKeyStroke);
			return () => {
				wrapperNode.removeEventListener("keydown", handleInputKeyStroke);
			};
		}, [handleToggleShowList, wrapperRef, options.length, showOptions]);

		const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
			e.persist();
			const { value } = e.target;
			setInputFilter(value);
			if (!value.length && showOptions) {
				setShowOptions(false);
			}
			if (value.length && !showOptions) {
				setShowOptions(true);
			}

			if (onChange) {
				onChange(null);
			}
			setSelectedOption(null);

			if (onInputChange) {
				onInputChange(e);
			}

			if (hiddenInputRef.current) {
				const hiddenNode = hiddenInputRef.current;
				hiddenNode.value = "";
				hiddenNode.dispatchEvent(new Event("input"));
			}
		};

		const selectComponent = inputActive ? (
			<div className={`input-wrapper `}>
				<input
					type="text"
					className={`select-input ${selectClassname}`}
					ref={inputRef}
					style={{ ...selectStyle }}
					value={inputFilter}
					onChange={handleInputChange}
					title={selectedOption?.label}
					disabled={disabled}
					{...rest}
				/>
				<div className="icon-wrapper" onClick={handleToggleShowList}>
					<FaChevronDown
						size={15}
						className={`arrow-icon ${showOptions ? "opened" : ""}`}
					/>
				</div>
			</div>
		) : (
			<div className="input-wrapper" onClick={handleToggleShowList}>
				<div className="select-input readonly" ref={inputRef}>
					<span>{selectedOption?.label || rest.placeholder}</span>
				</div>
				<div className="icon-wrapper">
					<FaChevronDown
						size={15}
						className={`arrow-icon ${showOptions ? "opened" : ""}`}
					/>
				</div>
			</div>
		);

		return (
			<>
				<div
					className={`select-wrapper ${disabled ? "disabled" : ""}`}
					tabIndex={1}
					ref={wrapperRef}
				>
					{selectComponent}
					{showOptions && (
						<ul
							className="options-list"
							ref={listRef}
							onKeyDown={handleKeyStrokeInList}
						>
							{!!optionsToShow.length &&
								optionsToShow.map((opt, key) => (
									<SelectOption
										key={key}
										optionData={opt}
										onOptionSelect={handleOptionSelect}
										isSelected={opt.value === selectedOption?.value}
										className={optionClassname}
										activeClassname={optionActiveClassName}
										style={optionStyle}
									/>
								))}
							{isLoading && loadingText ? (
								<li className="info-text">{loadingText}</li>
							) : hasError && errorText ? (
								<li className="info-text">{errorText}</li>
							) : (notFound || !optionsToShow.length) && notFoundText ? (
								<li className="info-text">{notFoundText}</li>
							) : null}
						</ul>
					)}
					<input
						type="text"
						name={rest.name}
						hidden
						ref={setHiddenInputRef}
						defaultValue={value ? value.value : undefined}
					/>
				</div>
				<style jsx>
					{`
						.select-wrapper {
							position: relative;
							width: 100%;
						}

						.select-wrapper.disabled {
							pointer-events: none;
							opacity: 0.75;
						}

						.select-wrapper :global(.input-wrapper) {
							position: relative;
						}

						.select-wrapper :global(.select-input) {
							width: 100%;
							height: 35px;
							padding-left: 15px;
							padding-right: 35px;
							border-radius: 5px;
							border: 1px solid #b6b6b6;
						}

						.select-wrapper :global(.select-input.readonly) {
							display: flex;
							align-items: center;
							background-color: white;
						}

						.select-wrapper :global(.icon-wrapper) {
							position: absolute;
							top: 0;
							right: 0;
							height: 100%;
							padding: 0 10px 0 8px;
							display: flex;
							align-items: center;
							justify-content: center;
							cursor: pointer;
						}

						.select-wrapper :global(.icon-wrapper::before) {
							content: "";
							position: absolute;
							left: -1px;
							height: 70%;
							top: 50%;
							transform: translateY(-50%);
							width: 1px;
							background-color: #b6b6b6;
						}

						.select-wrapper :global(.input-wrapper .arrow-icon) {
							fill: #585858;
							transition: transform 0.15s ease;
							transform-origin: center;
						}

						.select-wrapper :global(.input-wrapper .arrow-icon.opened) {
							transform: rotate(180deg);
						}

						.options-list {
							position: absolute;
							top: calc(100% + 5px);
							z-index: 1;
							left: 0;
							width: 100%;
							max-height: ${28 * maxItemsPerPage}px;
							overflow-y: scroll;
							border-style: solid;
							border-color: #b6b6b6;
							border-width: 1px;
							border-radius: 5px;
						}

						.info-text {
							position: relative;
							background-color: #fafafa;
							overflow: hidden;
							user-select: none;
							padding: 5px;
							font-size: 0.8rem;
							text-align: center;
							color: #7a7a7a;
						}
					`}
				</style>
			</>
		);
	}
);

Select.displayName = "Select";

import {
	useRef,
	forwardRef,
	MutableRefObject,
	useState,
	useEffect
} from "react";
import styled, { css } from "styled-components";
import { useCombinedRef } from "../hooks/useCombinedRef";
import { getRealBackgroundColor } from "../util/getRealBackgroundColor";
import { IconType } from "react-icons";
import clsx from "clsx";

export type InputProps = Omit<JSX.IntrinsicElements["input"], "ref"> & {
	showAnimatedName?: boolean;
	icon?: IconType;
	iconPosition?: "left" | "right";
};

const Wrapper = styled.div<{
	showAnimatedName: boolean;
	readonly?: boolean;
	realBackgroundColor: string;
	iconPosition: "left" | "right";
}>`
	position: relative;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	cursor: text;
	display: flex;
	align-items: center;
	flex-direction: row;
	height: 32px;
	border: 1px solid #b6b6b6;
	border-radius: 5px;

	${({ iconPosition }) =>
		!!(iconPosition && iconPosition === "left") &&
		css`
			& {
				flex-direction: row-reverse;
			}
		`}

	&:focus-within {
		outline: none;
		box-shadow: 0 0 0 2px #2b7de9;
		border-color: transparent;
	}

	${({ showAnimatedName, realBackgroundColor, readonly }) =>
		showAnimatedName &&
		!readonly &&
		css`
			&::before {
				content: attr(data-name);
				color: rgba(0, 0, 0, 0.4);
				font-size: 0.95rem;
				z-index: 100;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 10px;
				pointer-events: none;
				cursor: text;
				padding: 0 4px;
				transition: top 0.1s ease, font-size 0.1s ease;
			}

			&:focus-within::before {
				top: -2px;
				font-size: 0.83rem;
				background-color: ${realBackgroundColor};
				letter-spacing: 1.5px;
				color: #2b7de9;
				font-weight: 600;
			}

			&:focus-within ${StyledIconWrapper} {
				background-color: #4f8fe2;

				& > svg {
					color: #000000;
					mix-blend-mode: soft-light;
				}
			}

			&.not-empty:not(:focus-within)::before {
				top: -2px;
				left: 10px;
				font-size: 0.8rem;
				background-color: ${realBackgroundColor};
				font-weight: 400;
				letter-spacing: 1.5px;
			}
		`}
`;

const StyledInput = styled.input`
	height: calc(100% - 1px);
	padding: 0 10px;
	flex: 1;
	border: none;
	border-radius: 5px;

	&:focus {
		outline: none;
	}
`;

const StyledIconWrapper = styled.div`
	height: 100%;
	border-bottom-right-radius: 4px;
	border-top-right-radius: 4px;
	aspect-ratio: 1 / 1;
	background-color: #c7c7c7;
	display: flex;
	align-items: center;
	justify-content: center;

	& > svg {
		color: #000000;
		mix-blend-mode: overlay;
	}
`;

const TextInputComponent = (
	{
		name,
		showAnimatedName = true,
		icon,
		iconPosition = "right",
		...inputProps
	}: InputProps,
	ref: MutableRefObject<HTMLInputElement>
) => {
	const [classNames, setClassNames] = useState<string[]>([]);
	const [realBackgroundColor, setRealBackgroundColor] =
		useState<string | null>();
	const inputRef = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const combinedRef = useCombinedRef(inputRef, ref);

	useEffect(() => {
		if (!wrapperRef.current) return;
		setRealBackgroundColor(getRealBackgroundColor(wrapperRef.current));
	}, [wrapperRef]);

	useEffect(() => {
		if (!inputRef.current || !showAnimatedName) return;
		const setClassNamesOnBlur = (e: FocusEvent) => {
			const classNames = [];
			const { value } = e.target as HTMLInputElement;
			if (value.length) {
				classNames.push("not-empty");
			}
			setClassNames(classNames);
		};
		const inputNode = inputRef.current;
		inputNode.addEventListener("blur", setClassNamesOnBlur);
		return () => {
			inputNode.removeEventListener("blur", setClassNamesOnBlur);
		};
	}, [inputRef, showAnimatedName]);
	return (
		<Wrapper
			data-name={name}
			showAnimatedName={showAnimatedName}
			iconPosition={iconPosition}
			ref={wrapperRef}
			realBackgroundColor={realBackgroundColor || "transparent"}
			readonly={inputProps.readOnly}
			className={clsx(...classNames)}
		>
			<StyledInput ref={combinedRef} {...inputProps} />
			{icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
		</Wrapper>
	);
};

export const TextInput = forwardRef(TextInputComponent);

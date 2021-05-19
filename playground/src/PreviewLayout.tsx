import styled from "styled-components";
import { useLocation } from "react-router-dom";

const PreviewLayoutWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const 

export const PreviewLayout: React.FC = ({ children }) => {
	const { location } = useLocation<any>();
	return <PreviewLayoutWrapper>
            <ReturnButton />
        {children}</PreviewLayoutWrapper>;
};

PreviewLayout.displayName = "PreviewLayout";

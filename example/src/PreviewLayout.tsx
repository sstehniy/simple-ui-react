import styled from "styled-components";

const PreviewLayoutWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PreviewLayout: React.FC = ({ children }) => {
	return <PreviewLayoutWrapper>{children}</PreviewLayoutWrapper>;
};

PreviewLayout.displayName = "PreviewLayout";

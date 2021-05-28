import styled from "styled-components";

const HelloWorldWrapper = styled.div``;

// eslint-disable-next-line @typescript-eslint/ban-types
type HelloWorldProps = {};

export const HelloWorld: React.FC<HelloWorldProps> = ({ children }) => {
	return <HelloWorldWrapper>{children}</HelloWorldWrapper>;
};

HelloWorld.displayName = "HelloWorld";

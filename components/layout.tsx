import styled from 'styled-components';

import Link, { LinkProps } from 'next/link';

import { motion } from 'framer-motion';

export const Container = styled.div`
	border-radius: 4px;
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const InteractiveContainer = motion(
	styled.div`
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(39, 41, 46, 255);
		cursor: pointer;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	`,
	{ forwardMotionProps: true }
);

export type LinkButtonProps = React.PropsWithChildren<LinkProps> & {
	style?: any;
};
export const LinkButton = (props: LinkButtonProps) => {
	return (
		<>
			<LinkButtonContainer style={props.style}>
				<Link href={props.href} passHref>
					<LinkButtonLink target="_blank">{props.children}</LinkButtonLink>
				</Link>
			</LinkButtonContainer>
		</>
	);
};

const LinkButtonContainer = styled.div`
	position: relative;
	z-index: 1;

	padding: 0;
	margin: 0;
`;

const LinkButtonLink = styled.a`
	background-color: #23272b;
	color: white;
	font-size: 16px;
	padding: 12px;
	border-radius: 4px;

	position: relative;

	&::before {
		opacity: 0;
		transition: opacity 0.1s;

		background-color: white;
		filter: blur(2px);
		position: absolute;
		width: 100%;
		display: block;
		content: '.';
		margin-left: -2px;
		margin-top: -2px;
		padding-bottom: 24px;
		border-radius: 4px;
		border: 2px solid white;

		z-index: -1;
	}

	&:hover::before {
		opacity: 0.1;
	}
`;

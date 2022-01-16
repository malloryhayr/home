import styled from 'styled-components';

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

import styled from 'styled-components';

export const Container = styled.div`
	border-radius: 4px;
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const InteractiveContainer = styled.div`
	border-radius: 4px;
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

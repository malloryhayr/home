import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PageContainer>
			<PageContent>
				<Component {...pageProps} />
			</PageContent>
		</PageContainer>
	);
}

export default MyApp;

const PageContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const PageContent = styled.div`
	width: 37.5%;
	height: 75%;

	display: flex;
`;

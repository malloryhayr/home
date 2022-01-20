import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<PageContainer>
				<PageContent>
					<Component {...pageProps} />
				</PageContent>
			</PageContainer>
		</>
	);
}

export default MyApp;

const PageContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	@media only screen and (max-width: 930px) {
		width: 75%;
		margin-left: 12.5%;
	}
`;

const PageContent = styled.div`
	width: 48rem;
	height: auto;

	margin-top: 10rem;

	display: flex;

	@media only screen and (max-width: 930px) {
		width: 100%;
	}
`;

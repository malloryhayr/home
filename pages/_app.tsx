import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { SubHeader } from 'components/text';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<PageContainer>
				<PageContent>
					<Component {...pageProps} />
				</PageContent>
				<Footer>
					<SubHeader style={{ marginBottom: '4px' }}>William Hayr</SubHeader>
					<p>© 2022</p>
				</Footer>
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
	padding-bottom: 6rem;

	display: flex;

	@media only screen and (max-width: 930px) {
		width: 100%;
	}
	@media only screen and (max-width: 670px) {
		margin-top: 4rem;
		padding-bottom: 4rem;
	}

	border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const Footer = styled.div`
	width: 48rem;

	padding-left: 2.5rem;
	padding-top: 3rem;
	padding-bottom: 5rem;

	color: rgba(255, 255, 255, 0.6);

	@media only screen and (max-width: 930px) {
		width: 100%;
	}
`;

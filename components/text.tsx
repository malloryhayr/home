import { PropsWithChildren } from 'react';

export const Header = (props: PropsWithChildren<{}>) => (
	<h1 style={{ fontSize: '54px', fontWeight: '700' }}>{props.children}</h1>
);

export const Paragraph = (props: PropsWithChildren<{}>) => (
	<p
		style={{
			fontSize: '18px',
			color: 'rgba(255, 255, 255, 0.8)',
			marginTop: '20px',
		}}
	>
		{props.children}
	</p>
);

import { PropsWithChildren } from 'react';

export const Header = (props: PropsWithChildren<{}>) => (
	<h1 style={{ fontSize: '54px', fontWeight: '700' }}>{props.children}</h1>
);

export const SubHeader = (props: PropsWithChildren<{}>) => (
	<h2 style={{ fontSize: '27px', fontWeight: '700', marginTop: '18px' }}>
		{props.children}
	</h2>
);

export const Paragraph = (props: PropsWithChildren<{}>) => (
	<p
		style={{
			fontSize: '18px',
			color: 'rgba(255, 255, 255, 0.8)',
			marginTop: '18px',
			lineHeight: '2rem',
		}}
	>
		{props.children}
	</p>
);

export const Bold = (props: PropsWithChildren<{ style: any }>) => (
	<span style={{ fontWeight: '700', ...props.style }}>{props.children}</span>
);

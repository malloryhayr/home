import { PropsWithChildren } from 'react';

export const Header = (props: PropsWithChildren<{}>) => (
	<h1 style={{ fontSize: '54px' }}>{props.children}</h1>
);

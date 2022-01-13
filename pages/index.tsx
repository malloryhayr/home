import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GitHub, Twitter } from 'react-feather';

import { Header, Paragraph } from 'components/text';

import { isDate } from 'lib/time';
import { BIRTHDAY } from 'lib/constants';

const Home: NextPage = () => {
	const [isBirthday, setIsBirthday] = useState(isDate(BIRTHDAY));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setIsBirthday(isDate(BIRTHDAY));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck]);

	const socials = [
		{
			link: 'https://github.com/iGalaxyYT',
			icon: GitHub,
		},
		{
			link: 'https://twitter.com/_iGalaxyYT',
			icon: Twitter,
		},
	];

	return (
		<div>
			{socials.map((social, i) => (
				<Link href={social.link} passHref key={`social${i}`}>
					<a target="_blank" style={{ paddingRight: '10px' }}>
						<social.icon width={28} height={28} className={'socialIcon'} />
					</a>
				</Link>
			))}
			<Header>
				Hey, I{`'`}m William {isBirthday ? '🥳' : '👋'}
			</Header>
			<Paragraph>
				I{`'`}m a <Age birthdate={new Date(BIRTHDAY).getTime()} />
				-year-old aspiring software engineer.
			</Paragraph>
		</div>
	);
};

export default Home;

const Age = ({ birthdate }: { birthdate: number }) => {
	const [clicked, setClicked] = useState(false);

	const diff = Date.now() - birthdate;

	const [yearRounded, setYearRounded] = useState(Math.floor(diff / 3.154e10));
	const [yearExact, setYearExact] = useState(diff / 3.154e10);

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setYearRounded(Math.floor(diff / 3.154e10));
			setYearExact(diff / 3.154e10);

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck, diff]);

	return (
		<span onClick={() => setClicked(!clicked)} className={'clickable'}>
			{clicked ? `~${yearExact.toFixed(8)}` : yearRounded}
		</span>
	);
};

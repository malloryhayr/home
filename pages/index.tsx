import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GitHub, MessageSquare, Twitter } from 'react-feather';
import dayjs from 'dayjs';

import { Header, Paragraph, SubHeader } from 'components/text';

import { isDate } from 'lib/time';
import { Discord } from 'components/presence/discord';

const Home: NextPage = () => {
	const socials = [
		{
			link: 'https://github.com/iGalaxyYT',
			icon: GitHub,
		},
		{
			link: 'https://twitter.com/_iGalaxyYT',
			icon: Twitter,
		},
		{
			link: 'https://link.igalaxy.dev/discord',
			icon: MessageSquare,
		},
	];

	const [isBirthday, setIsBirthday] = useState(isDate('2005-03-13'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setIsBirthday(isDate('2005-03-13'));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck]);

	return (
		<div>
			<div style={{ marginBottom: '18px' }}>
				{socials.map((social, i) => (
					<Link href={social.link} passHref key={`social${i}`}>
						<a target="_blank" style={{ paddingRight: '10px' }}>
							<social.icon width={28} height={28} className={'socialIcon'} />
						</a>
					</Link>
				))}
			</div>
			<Header>Hey, I&lsquo;m William {isBirthday ? '🥳' : '👋'}</Header>
			<Paragraph>
				I&lsquo;m a <Age birthdate={'2005-03-13'} />
				-year-old aspiring software engineer & amateur game designer.
			</Paragraph>
			<Paragraph>
				I&lsquo;m pursuing full-stack web development using modern technologies
				and I&lsquo;m creating multiplayer experiences for Minecraft: Java
				Edition.
			</Paragraph>
			<br />
			<div style={{ display: 'flex' }}>
				<Discord id={'182292736790102017'} />
			</div>
			<br />
			<SubHeader>What am I building?</SubHeader>
			<Paragraph>
				I&lsquo;m currently juggling a lot of projects, but here is a selection
				of some of my favorite open source projects I&lsquo;ve worked on.
			</Paragraph>
		</div>
	);
};

export default Home;

const Age = ({ birthdate }: { birthdate: string }) => {
	const [clicked, setClicked] = useState(false);

	const [year, setYear] = useState(dayjs().diff(birthdate, 'year'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setYear(dayjs().diff(birthdate, 'year', true));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [birthdate, intervalCheck]);

	return (
		<span onClick={() => setClicked(!clicked)} className={'clickable'}>
			{clicked ? `~${year.toFixed(8)}` : Math.floor(year)}
		</span>
	);
};

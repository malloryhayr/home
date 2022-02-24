import {
	Cloudflare,
	Git,
	Go,
	Gradle,
	Icon,
	Java,
	Kotlin,
	Nextdotjs,
	Nodedotjs,
	Postgresql,
	ReactJs,
	Redis,
	Styledcomponents,
	Supabase,
	Typescript,
	Vercel,
	Yarn,
} from '@icons-pack/react-simple-icons';

import { WAKATIME_USERNAME } from 'lib/constants';
import {
	useWakaTimeStats,
	WakaTimeLanguage,
	useLanguageFromWakaTimeStats,
} from 'lib/hooks';

import ReactTooltip from 'react-tooltip';

export const Tools = () => {
	const { data: wakatime } = useWakaTimeStats(WAKATIME_USERNAME);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				flexWrap: 'wrap',
			}}
		>
			<ToolListItem
				Logo={Typescript}
				text={'TypeScript'}
				lang={useLanguageFromWakaTimeStats(
					wakatime || { data: { languages: [] } },
					'TypeScript'
				)}
			/>
			<ToolListItem
				Logo={Kotlin}
				text={'Kotlin'}
				lang={useLanguageFromWakaTimeStats(
					wakatime || { data: { languages: [] } },
					'Kotlin'
				)}
			/>
			<ToolListItem
				Logo={Java}
				text={'Java'}
				lang={useLanguageFromWakaTimeStats(
					wakatime || { data: { languages: [] } },
					'Java'
				)}
			/>
			<ToolListItem
				Logo={Go}
				text={'Golang'}
				lang={useLanguageFromWakaTimeStats(
					wakatime || { data: { languages: [] } },
					'Go'
				)}
			/>
			<ToolListItem Logo={Redis} text={'Redis'} />
			<ToolListItem Logo={Postgresql} text={'Postgres'} />
			<ToolListItem Logo={Supabase} text={'Supabase'} />
			<ToolListItem Logo={Vercel} text={'Vercel'} />
			<ToolListItem Logo={Cloudflare} text={'Cloudflare'} />
			<ToolListItem Logo={ReactJs} text={'React.js'} />
			<ToolListItem Logo={Nextdotjs} text={'Next.js'} />
			<ToolListItem Logo={Styledcomponents} text={'styled-components'} />
			<ToolListItem Logo={Nodedotjs} text={'Node.js'} />
			<ToolListItem Logo={Yarn} text={'Yarn'} />
			<ToolListItem Logo={Gradle} text={'Gradle'} />
			<ToolListItem Logo={Git} text={'Git'} />
		</div>
	);
};

const ToolListItem = ({
	Logo,
	text,
	lang,
}: {
	Logo: Icon;
	text: string;
	lang?: WakaTimeLanguage;
}) => {
	return (
		<>
			{lang ? (
				<ReactTooltip backgroundColor="#0d1117" border borderColor="#27292e" />
			) : (
				<></>
			)}
			<div
				style={{
					margin: '10px',
				}}
				className={'ToolListItem'}
				data-tip={
					lang ? `${lang.hours}h ${lang.minutes}m past week` : undefined
				}
			>
				<p
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Logo color={'#ffffff'} size={20} style={{ marginRight: '8px' }} />{' '}
					<span
						style={{
							fontSize: '16px',
							borderBottom: lang ? '1px dotted white' : undefined,
						}}
					>
						{text}
					</span>
				</p>
			</div>
		</>
	);
};

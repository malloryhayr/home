import {
	Cloudflare,
	Git,
	Githubactions,
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
	Rust,
	Styledcomponents,
	Supabase,
	Typescript,
	Vercel,
	Yarn,
} from '@icons-pack/react-simple-icons';

export const Tools = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				flexWrap: 'wrap',
			}}
		>
			<ToolListItem Logo={Typescript} text={'TypeScript'} />
			<ToolListItem Logo={Kotlin} text={'Kotlin'} />
			<ToolListItem Logo={Java} text={'Java'} />
			<ToolListItem Logo={Go} text={'Golang'} />
			<ToolListItem Logo={Postgresql} text={'Postgres'} />
			<ToolListItem Logo={Redis} text={'Redis'} />
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

const ToolListItem = ({ Logo, text }: { Logo: Icon; text: string }) => {
	return (
		<div
			style={{
				margin: '10px',
			}}
			className={'ToolListItem'}
		>
			<p
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					fontSize: '16px',
				}}
			>
				<Logo color={'#ffffff'} size={20} style={{ marginRight: '8px' }} />{' '}
				{text}
			</p>
		</div>
	);
};

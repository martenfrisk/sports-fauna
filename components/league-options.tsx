// const ClassEnumType = [
// 	{enum: 'SINGLETEAM', description: 'One team'},
// 	{enum: 'SINGLEDIVISION', description: 'One division'},
// 	{enum: 'MULTITEAM', description: 'Multiple teams'},
// 	{enum: 'MULTIDIVISION', description: 'Multiple divisions'},
// 	{enum: 'ANY', description: 'Any combination of teams and divisions'},
// ]

const LeagueOptions = ({ optionsData }: { optionsData: any }) => {
	const [options, setOptions] = optionsData
	return (
		<div className="flex flex-col items-start w-full p-2 rounded-lg bg-gray-50">
			{/* <select
				className="p-2 my-2 rounded-md"
				value={options.class}
				onChange={(e) => setOptions((prev) => ({...prev, class: e.target.value}))}
			>
				{ClassEnumType.map((item) => (<option key={item.enum} value={item.enum}>{item.description}</option>))}
			</select> */}
			<div className="flex justify-center space-x-2 text-sm">
				<button
					className={`${options.public && 'bg-blue-300'} w-20 border border-blue-200 p-2 rounded-md`}
					onClick={() => setOptions((prev) => ({...prev, public: true }))}
				>
				Public
				</button>
				<button
					className={`${!options.public && 'bg-blue-300'}  w-20 border border-blue-200 p-2 rounded-md`}
					onClick={() => setOptions((prev) => ({...prev, public: false }))}
				>
				Private
				</button>
			</div>
		</div>
	)
}

export default LeagueOptions
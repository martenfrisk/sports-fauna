const LeagueOptions = ({ optionsData }: { optionsData: any }) => {
  const [options, setOptions] = optionsData;
  return (
    <div className="flex flex-col items-start w-auto p-2 bg-white rounded-lg">
      <div className="flex justify-center space-x-2 text-sm">
        <button
          className={`${
            options && 'bg-blue-300'
          } w-20 border border-blue-200 p-2 rounded-md`}
          onClick={() => setOptions(true)}
          type="button"
        >
          Public
        </button>
        <button
          className={`${
            !options && 'bg-blue-300'
          }  w-20 border border-blue-200 p-2 rounded-md`}
          onClick={() => setOptions(false)}
          type="button"
        >
          Private
        </button>
      </div>
    </div>
  );
};

export default LeagueOptions;

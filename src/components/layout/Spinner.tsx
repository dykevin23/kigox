const Spinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-75 bg-gray-400">
      <div className="w-16 h-16 relative">
        <div className="animate-spin absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-blue-500"></div>
      </div>
      <span className="mt-5 text-sm font-medium text-white">
        잠시만 기다려주세요.
      </span>
    </div>
  );
};

export default Spinner;

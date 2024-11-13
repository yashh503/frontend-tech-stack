const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-foreground via-purple-400 to-indigo-600 md:w-32 md:h-32 h-32 w-22 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-300 dark:bg-slate-900 background-blur-md"></div>
      </div>
    </div>
  );
};

export default Loading;

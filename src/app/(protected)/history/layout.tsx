interface HistoryLayoutProps {
  children: React.ReactNode;
}

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return (
    <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
      <div className="max-w-[1056px] mx-auto pt-6 h-full">
        { children }
      </div>
    </main>
  );
}

export default HistoryLayout;
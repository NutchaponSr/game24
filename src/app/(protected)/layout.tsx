type ProtectedLayoutProps = {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default ProtectedLayout;
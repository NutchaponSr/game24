interface StickyWrapperProps {
  children: React.ReactNode;
}

export const StickyWrapper = ({ children }: StickyWrapperProps) => {
  return (
    <div className="hidden lg:block w-80 sticky self-end bottom-6">
      <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
        { children }
      </div>
    </div>
  );
}
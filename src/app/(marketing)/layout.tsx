import { Footer } from "./components/footer";
import { Header } from "./components/header";

type MarketingLayoutProps = {
  children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
} 

export default MarketingLayout;
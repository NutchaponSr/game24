import Image from "next/image";

import { UserButton } from "@/modules/auth/components/user-button";

export const Header = () => {
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <Image src="/logo.svg" alt="Logo" height={40} width={40}/>
      <div className="text-muted-foreground flex items-center font-bold">
        <UserButton />
      </div>
    </header>
  );
}
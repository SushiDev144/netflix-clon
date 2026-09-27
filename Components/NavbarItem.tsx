import { useRouter } from 'next/router';
import { FC } from "react";

interface NavbarItemProps {
  label: string;
  href?: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ label, href }) => {
  const router = useRouter();
  return (
    <div 
      onClick={() => href && router.push(href)} 
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </div>
  );
};

export default NavbarItem;

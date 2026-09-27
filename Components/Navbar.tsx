import Image from "next/image";
import logo from "../public/images/logo.png";
import avatar from "../public/images/default-green.png";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

function Navbar() {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [showBackground, setShowBackground] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= TOP_OFFSET) {
				setShowBackground(true);
			} else {
				setShowBackground(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setShowMobileMenu((current) => !current);
	}, []);

	const toggleAccountMenu = useCallback(() => {
		setShowAccountMenu((current) => !current);
	}, []);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<nav className="w-full fixed z-40">
			<div
				className={`
                    px-4 
                    md:px-16 
                    py-6 
                    flex 
                    flex-row 
                    items-center 
                    transition 
                    duration-500 
                    bg-zinc-900 
                    ${
						showBackground
							? "bg-zinc-900 bg-opacity-90"
							: "bg-opacity-0"
					}`}
			>
				<Image
					className="lg:h-7 cursor-pointer"
					src={logo}
					alt="Website-Logo"
					width={120}
					height={120}
					onClick={() => router.push('/')}
				/>
				<div className="flex-row ml-8 gap-7 hidden lg:flex">
					<NavbarItem label="Home" href="/" />
					<NavbarItem label="Series" href="/series" />
					<NavbarItem label="Films" href="/films" />
					<NavbarItem label="New & Popular" href="/#new" />
					<NavbarItem label="My List" href="/#favorites" />
					<NavbarItem label="Browse by languages" href="/#languages" />
				</div>
				<div
					className="flex flex-row gap-2 items-center ml-2 md:ml-8 cursor-pointer relative lg:hidden"
					onClick={toggleMobileMenu}
				>
					<p className="text-white text-sm">Browse</p>
					<BsChevronDown
						className={`text-white transition ${
							showMobileMenu ? "rotate-180" : "rotate-0"
						}`}
					/>
					<MobileMenu visible={showMobileMenu} />
				</div>
				<div className="flex flex-row md:ml-auto m-0 gap-2 md:gap-7 items-center">
					<form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
						<button 
							type="button" 
							onClick={() => setShowSearch(!showSearch)} 
							className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
						>
							<BsSearch size={18} />
						</button>
						{showSearch && (
							<input 
								type="text"
								placeholder="Titles, genres..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="bg-black/70 border border-white/20 text-white text-sm px-3 py-1 rounded outline-none transition focus:border-white"
								autoFocus
							/>
						)}
					</form>
					<div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
						<BsBell className="w-6" size={18} />
					</div>

					<div
						className="flex flex-row items-center gap-2 cursor-pointer relative"
						onClick={toggleAccountMenu}
					>
						<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
							<Image src={avatar} alt="Avatar" />
						</div>
						<BsChevronDown
							className={`text-white transition ${
								showAccountMenu ? "rotate-180" : "rotate-0"
							}`}
						/>
						<AccountMenu visible={showAccountMenu} />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

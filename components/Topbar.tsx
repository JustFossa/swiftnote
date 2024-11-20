import React from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
	return (
		<div className="w-full  p-5 flex self-center justify-center items-center ">
			<Link href="/">
				<Image
					src={Logo}
					alt="Logo"
					className="lg:h-10 md:h-12 sm:h-16 h-20 block"
				/>
			</Link>
		</div>
	);
}

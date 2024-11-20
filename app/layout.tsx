import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Topbar from "@/components/Topbar";

const onest = localFont({
	src: "./fonts/Onest.ttf",
	variable: "--font-onest",
	weight: "100 200 300 500 600 700 800 900",
});

export const metadata: Metadata = {
	title: "Swiftnote",
	description: "Create and share self-destructing notes with ease.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${onest.className} antialiased flex flex-col`}>
				<Topbar />
				{children}
			</body>
		</html>
	);
}

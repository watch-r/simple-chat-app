import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "./ui/theme-provider";
import AuthProvider from "./auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Simple Chat App",
    description: "An App Where Friends Can Chat with Each Others",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <AuthProvider> */}
                <body className={inter.className}>
                    <ThemeProvider attribute="class">
                        <Theme
                            accentColor="iris"
                            grayColor="olive"
                            radius="full"
                        >
                            <main className="p-5">{children}</main>
                            {/* <ThemePanel /> */}
                        </Theme>
                    </ThemeProvider>
                </body>
            {/* </AuthProvider> */}
        </html>
    );
}

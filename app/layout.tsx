import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, Container } from "@chakra-ui/react";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Movie Database",
    description: "Searchable movie database using OMDb api"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Container maxW="960px">
                        <Box p="5">
                            {children}
                        </Box>
                    </Container>
                </Providers>
            </body>
        </html>
    );
}

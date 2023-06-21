import React from "react";

import Head from "next/head";

import { Box, CssBaseline, Toolbar } from "@mui/material";

import { AppBar } from "@components/AppBar";
import { SideBar } from "@components/SideBar";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function Layout({ children, title }: LayoutProps) {
    return (
        <Box display="flex">
            <Head>
                <title>{title ? `${title} - CabinetJS` : "CabinetJS"}</title>
            </Head>
            <CssBaseline />
            <AppBar title={title} />
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

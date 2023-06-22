import React from "react";

import Head from "next/head";

import { Box, CssBaseline, Toolbar } from "@mui/material";

import { FullAttachmentFragment } from "@apollo/queries";

import { AppBar } from "@components/AppBar";
import { SideBar } from "@components/SideBar";
import { LayoutContext } from "@components/Layout/context";
import { MediaViewer } from "@components/Media/MediaViewer";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function Layout({ children, title }: LayoutProps) {
    const [attachments, setAttachments] = React.useState<FullAttachmentFragment[]>([]);
    const [mediaViewerVisibility, setMediaViewerVisibility] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (mediaViewerVisibility) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [mediaViewerVisibility]);

    const handleMediaViewerClose = React.useCallback(() => {
        setMediaViewerVisibility(false);
    }, []);

    return (
        <LayoutContext.Provider value={{ setAttachments, setMediaViewerVisibility }}>
            <Box display="flex">
                <Head>
                    <title>{title ? `${title} - CabinetJS` : "CabinetJS"}</title>
                </Head>
                <CssBaseline />
                <AppBar title={title} hasAttachments={attachments.length > 0} />
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
                    <Toolbar />
                    {children}
                </Box>
                <MediaViewer
                    attachments={attachments}
                    opened={mediaViewerVisibility}
                    onClose={handleMediaViewerClose}
                />
            </Box>
        </LayoutContext.Provider>
    );
}

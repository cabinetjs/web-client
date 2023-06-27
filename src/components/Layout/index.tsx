import React from "react";

import Head from "next/head";

import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import { FullAttachmentFragment } from "@apollo/queries";

import { AppBar } from "@components/AppBar";
import { SideBar } from "@components/SideBar";
import { LayoutContext, LayoutEventMap, LayoutEventTypeMap } from "@components/Layout/context";
import { MediaViewer } from "@components/Media/MediaViewer";
import { Preview } from "@components/Preview";
import { usePreview } from "@components/Preview/Context";

import { SIDEBAR_WIDTH } from "@constants/layout";
import { usePathname } from "next/navigation";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    refreshable?: boolean;
}

export function Layout({ children, title, refreshable }: LayoutProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { attachment, setAttachment } = usePreview();
    const [attachments, setAttachments] = React.useState<FullAttachmentFragment[]>([]);
    const [mediaViewerVisibility, setMediaViewerVisibility] = React.useState<boolean>(false);
    const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);
    const [appBarHeight, setAppBarHeight] = React.useState<number>(0);
    const oldPathname = React.useRef<string>(pathname);
    const eventMap = React.useRef<LayoutEventMap>({
        refresh: [],
        "media-viewer-change": [],
    });

    React.useEffect(() => {
        if (pathname !== oldPathname.current) {
            setAttachment(null);
            setAttachments([]);
            setMediaViewerVisibility(false);

            oldPathname.current = pathname;
        }
    }, [pathname, setAttachment]);

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
    const handleRefresh = React.useCallback(() => {
        eventMap.current.refresh.forEach(listener => listener());
    }, []);
    const handleMediaViewerChange = React.useCallback((attachment: FullAttachmentFragment) => {
        eventMap.current["media-viewer-change"].forEach(listener => listener(attachment));
    }, []);

    const addEventListener = React.useCallback(
        <K extends keyof LayoutEventMap>(type: K, listener: LayoutEventTypeMap[K]) => {
            eventMap.current[type].push(listener);
        },
        [],
    );
    const removeEventListener = React.useCallback(
        <K extends keyof LayoutEventMap>(type: K, listener: LayoutEventTypeMap[K]) => {
            eventMap.current[type] = eventMap.current[type].filter(l => l !== listener) as (typeof eventMap.current)[K];
        },
        [],
    );

    const scrollToTop = React.useCallback(
        (dom: HTMLElement, smooth?: boolean) => {
            window.scrollTo({
                top: dom.offsetTop - appBarHeight,
                behavior: smooth ? "smooth" : "auto",
            });
        },
        [appBarHeight],
    );

    return (
        <LayoutContext.Provider
            value={{
                setAttachments,
                setMediaViewerVisibility,
                addEventListener,
                removeEventListener,
                scrollToTop,
            }}
        >
            <Box width="100%" display="flex">
                <Head>
                    <title>{title ? `${title} - CabinetJS` : "CabinetJS"}</title>
                </Head>
                <CssBaseline />
                <AppBar
                    title={title}
                    hasAttachments={attachments.length > 0}
                    onSideBarOpen={() => setSideBarOpen(true)}
                    onHeightChange={setAppBarHeight}
                    onRefresh={refreshable ? handleRefresh : undefined}
                />
                <SideBar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
                <Box
                    maxWidth={isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`}
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
                >
                    <Toolbar />
                    {children}
                </Box>
                <MediaViewer
                    attachments={attachments}
                    opened={mediaViewerVisibility}
                    onClose={handleMediaViewerClose}
                    onChange={handleMediaViewerChange}
                />
                <Preview attachment={attachment} />
            </Box>
        </LayoutContext.Provider>
    );
}

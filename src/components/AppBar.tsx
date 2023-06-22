import React from "react";

import { Box, IconButton, Toolbar, Typography, Tooltip, useTheme, useMediaQuery, ThemeProvider } from "@mui/material";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { useLayout } from "@components/Layout/useLayout";

import { Root } from "@components/AppBar.styles";
import { sideBarTheme, theme } from "@styles/theme";

export interface AppBarProps {
    title?: string;
    hasAttachments: boolean;
    onSideBarOpen?(): void;
}

export function AppBar({ title = "CabinetJS", hasAttachments, onSideBarOpen }: AppBarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { setMediaViewerVisibility } = useLayout();
    const handleMediaViewerOpen = () => {
        setMediaViewerVisibility(true);
    };

    return (
        <ThemeProvider theme={isMobile ? sideBarTheme : theme}>
            <Root position="fixed" elevation={0} color="transparent">
                <Toolbar>
                    {isMobile && (
                        <Tooltip title="메뉴 열기">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={onSideBarOpen}
                            >
                                <MenuRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Box flex="1 1 auto" />
                    {hasAttachments && (
                        <Tooltip title="이미지 보기">
                            <IconButton onClick={handleMediaViewerOpen}>
                                <CollectionsRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
            </Root>
        </ThemeProvider>
    );
}

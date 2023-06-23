import React from "react";
import useMeasure from "react-use-measure";

import {
    Box,
    IconButton,
    Toolbar,
    Typography,
    Tooltip,
    useTheme,
    useMediaQuery,
    ThemeProvider,
    Stack,
} from "@mui/material";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useLayout } from "@components/Layout/useLayout";

import { Root } from "@components/AppBar.styles";
import { sideBarTheme } from "@styles/theme";

export interface AppBarProps {
    title?: string;
    hasAttachments: boolean;
    onSideBarOpen?(): void;
    onRefresh?(): void;
    onHeightChange?(height: number): void;
}

export function AppBar({ title = "CabinetJS", hasAttachments, onSideBarOpen, onRefresh, onHeightChange }: AppBarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { setMediaViewerVisibility } = useLayout();
    const [rootRef, { height }] = useMeasure();

    const handleMediaViewerOpen = () => {
        setMediaViewerVisibility(true);
    };

    React.useEffect(() => {
        if (!onHeightChange || !height) {
            return;
        }

        onHeightChange(height);
    }, [height, onHeightChange]);

    return (
        <ThemeProvider theme={isMobile ? sideBarTheme : theme}>
            <Root ref={rootRef} position="fixed" elevation={0} color="transparent">
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
                    <Stack direction="row" spacing={0.5}>
                        {hasAttachments && (
                            <Tooltip title="이미지 보기">
                                <IconButton onClick={handleMediaViewerOpen}>
                                    <CollectionsRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {onRefresh && (
                            <Tooltip title="새로 고침">
                                <IconButton onClick={onRefresh}>
                                    <RefreshRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                </Toolbar>
            </Root>
        </ThemeProvider>
    );
}

import React from "react";

import { Box, IconButton, Toolbar, Typography, Tooltip } from "@mui/material";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";

import { useLayout } from "@components/Layout/useLayout";

import { Root } from "@components/AppBar.styles";

export interface AppBarProps {
    title?: string;
    hasAttachments: boolean;
}

export function AppBar({ title = "CabinetJS", hasAttachments }: AppBarProps) {
    const { setMediaViewerVisibility } = useLayout();
    const handleMediaViewerOpen = () => {
        setMediaViewerVisibility(true);
    };

    return (
        <Root position="fixed" elevation={0} color="transparent">
            <Toolbar>
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
    );
}

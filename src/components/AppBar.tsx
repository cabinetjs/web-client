import React from "react";

import { Toolbar, Typography } from "@mui/material";

import { Root } from "@components/AppBar.styles";

export interface AppBarProps {
    title?: string;
}

export function AppBar({ title = "CabinetJS" }: AppBarProps) {
    return (
        <Root position="fixed" elevation={0} color="transparent">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </Root>
    );
}

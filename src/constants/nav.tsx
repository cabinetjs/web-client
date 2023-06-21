import React from "react";

import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { MenuItem } from "@components/Menu";

export const NAV_MENU_ITEMS: MenuItem[] = [
    {
        label: "Home",
        icon: <HomeOutlinedIcon />,
        href: "/",
    },
    {
        label: "Data Sources",
        icon: <FolderCopyOutlinedIcon />,
        href: "/data-sources",
    },
];

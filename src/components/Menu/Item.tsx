import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { Chevron, Icon, IconPlaceholder, Label, Root } from "@components/Menu/Item.styles";

export interface MenuItemProps {
    href?: string;
    opened?: boolean;
    activated?: boolean;
    icon?: React.ReactNode;
    label: string;

    hasChildren?: boolean;
    isChild?: boolean;

    onClick?(e: React.MouseEvent): void;
}

export function MenuItem({
    href,
    opened = false,
    activated,
    icon,
    label,
    hasChildren,
    onClick,
    isChild,
}: MenuItemProps) {
    const props = href ? { component: Link, href: href } : {};
    const pathname = usePathname();
    const active = activated ?? pathname === href;

    return (
        <Root role="button" active={active} onClick={onClick} isChild={isChild} {...props}>
            <Icon>{icon ?? <IconPlaceholder active={active} />}</Icon>
            <Typography component={Label} variant="body1" fontSize="0.875rem" fontWeight={600}>
                {label}
            </Typography>
            <Box component="span" flex="1 1 auto" />
            {hasChildren && <Chevron>{opened ? <ExpandMoreRoundedIcon /> : <ChevronRightRoundedIcon />}</Chevron>}
        </Root>
    );
}

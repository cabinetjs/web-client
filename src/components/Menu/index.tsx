import React from "react";
import { usePathname } from "next/navigation";

import { Box, Collapse, Typography } from "@mui/material";

import { MenuItem as Item } from "@components/Menu/Item";
import { ListTitle, Root, Wrapper } from "@components/Menu/index.styles";

import { makeInternalArray } from "@utils/makeInternal";

export interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    activated?(pathname: string): boolean;
    children?: Omit<MenuItem, "icon">[];
}

export interface MenuProps {
    title?: string;
    items: MenuItem[];
}

export function Menu(props: MenuProps) {
    const [items] = React.useState(makeInternalArray(props.items));
    const [openedMap, setOpenedMap] = React.useState<{ [key: string]: boolean }>({});
    const pathname = usePathname();

    const handleItemClick = (e: React.MouseEvent, item: MenuItem, key: string) => {
        if (item.children) {
            e.preventDefault();
            setOpenedMap(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    return (
        <Wrapper>
            {props.title && (
                <Typography component={ListTitle} fontSize="0.75rem" fontWeight={600} textTransform="uppercase">
                    {props.title}
                </Typography>
            )}
            <Root>
                {items.map(item => (
                    <React.Fragment key={item.key}>
                        <Item
                            label={item.label}
                            icon={item.icon}
                            href={item.href}
                            activated={item.activated?.(pathname)}
                            opened={openedMap[item.key]}
                            hasChildren={!!item.children}
                            onClick={e => handleItemClick(e, item, item.key)}
                        />
                        {item.children && (
                            <Collapse in={openedMap[item.key]}>
                                <Box mb={0.5}>
                                    {item.children?.map(child => (
                                        <Item
                                            isChild
                                            key={child.label}
                                            label={child.label}
                                            href={child.href}
                                            activated={child.activated?.(pathname)}
                                        />
                                    ))}
                                </Box>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </Root>
        </Wrapper>
    );
}

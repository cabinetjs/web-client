import React from "react";

import { Box } from "@mui/material";

import { Card } from "@components/Card";

import { Nullable } from "@utils/types";

export interface CardListProps<T> {
    count: number;
    items: Nullable<T[]>;
    loading?: boolean;
    children(item: T): React.ReactNode;
}

export function CardList<T>({ count, items, children, loading }: CardListProps<T>) {
    const listItems: React.ReactNode[] = [];
    if (items && !loading) {
        for (const item of items) {
            listItems.push(children(item));
        }
    } else {
        for (let i = 0; i < count; i++) {
            listItems.push(<Card key={i} skeleton />);
        }
    }

    return (
        <Box display="flex" flexWrap="wrap">
            {listItems}
        </Box>
    );
}

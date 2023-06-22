import React from "react";

import { Container, Grid } from "@mui/material";

import { Card } from "@components/Card";

import { Nullable } from "@utils/types";

export interface CardListProps<T> {
    count: number;
    items: Nullable<T[]>;
    loading?: boolean;
    children(item: T): React.ReactNode;
}

export function CardList<T>({ count, items, children, loading }: CardListProps<T>) {
    let listItems: React.ReactNode[] = [];
    if (items && !loading) {
        for (const item of items) {
            listItems.push(children(item));
        }
    } else {
        for (let i = 0; i < count; i++) {
            listItems.push(<Card skeleton />);
        }
    }

    listItems = listItems.map((item, index) => (
        <Grid item key={index} sm={6} md={4} lg={4} xl={2.4}>
            {item}
        </Grid>
    ));

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                {listItems}
            </Grid>
        </Container>
    );
}

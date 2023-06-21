import React from "react";

import { Box } from "@mui/material";

import { Card } from "@components/Card";

import { FullDataSourceFragment } from "@apollo/queries";

import { getThumbnailUrl } from "@utils/attachments";
import { Nullable } from "@utils/types";
import DataSourcesPageProps from "../../pages/data-sources";

export interface DataSourcesPageProps {
    items: Nullable<FullDataSourceFragment[]>;
    itemCount: number;
    loading: boolean;
}

export function DataSourcesPage({ items, itemCount, loading }: DataSourcesPageProps) {
    const children: React.ReactNode[] = [];
    if (items && !loading) {
        for (const item of items) {
            children.push(
                <Card
                    key={item.id}
                    title={item.id}
                    mediaCount={item.mediaCount}
                    postCount={item.postCount}
                    thumbnail={getThumbnailUrl(item.latestAttachment, 320, 180)}
                    href={`/data-sources/${item.id}`}
                />,
            );
        }
    } else {
        for (let i = 0; i < itemCount; i++) {
            children.push(<Card key={i} skeleton />);
        }
    }

    return (
        <Box display="flex" flexWrap="wrap">
            {children}
        </Box>
    );
}

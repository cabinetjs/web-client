import React from "react";

import { Card } from "@components/Card";
import { CardList } from "@components/CardList";

import { MinimalBoardFragment } from "@apollo/queries";

import { getThumbnailUrl } from "@utils/attachments";
import { Nullable } from "@utils/types";

export interface DataSourceBoardsPageProps {
    items: Nullable<MinimalBoardFragment[]>;
    itemCount: number;
    loading: boolean;
}

export function DataSourceBoardsPage({ items, itemCount, loading }: DataSourceBoardsPageProps) {
    return (
        <CardList count={itemCount} items={items} loading={loading}>
            {item => (
                <Card
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    mediaCount={item.mediaCount}
                    postCount={item.postCount}
                    thumbnail={getThumbnailUrl(item.latestAttachment, 320, 180)}
                    href={`/boards/${item.id}`}
                />
            )}
        </CardList>
    );
}

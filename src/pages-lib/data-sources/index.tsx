import React from "react";

import { Card } from "@components/Card";
import { CardList } from "@components/CardList";

import { FullDataSourceFragment } from "@apollo/queries";

import { getThumbnailUrl } from "@utils/attachments";
import { Nullable } from "@utils/types";

export interface DataSourcesPageProps {
    items: Nullable<FullDataSourceFragment[]>;
    itemCount: number;
    loading: boolean;
}

export function DataSourcesPage({ items, itemCount, loading }: DataSourcesPageProps) {
    return (
        <CardList count={itemCount} items={items} loading={loading}>
            {item => (
                <Card
                    key={item.id}
                    title={item.id}
                    mediaCount={item.mediaCount}
                    postCount={item.postCount}
                    thumbnail={getThumbnailUrl(item.latestAttachment, 320, 180)}
                    href={`/data-sources/${item.id}`}
                />
            )}
        </CardList>
    );
}

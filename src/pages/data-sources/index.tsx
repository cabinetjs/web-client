import React from "react";

import { queryDataSourceCount, useDataSourcesQuery } from "@apollo/queries";

import { CardList } from "@components/CardList";
import { Card } from "@components/Card";
import { useRefresh } from "@components/Layout/useRefresh";

import { installRouteMiddleware } from "@utils/routes/middleware";
import { PageProps } from "@utils/routes/types";
import { getThumbnailUrl } from "@utils/attachments";

interface DataSourcesPageProps extends PageProps {
    itemCount: number;
}

export default function DataSources({ itemCount }: DataSourcesPageProps) {
    const { data, loading, refetch } = useDataSourcesQuery();
    const isRefreshing = useRefresh(refetch);

    return (
        <CardList count={itemCount} items={data?.dataSources} loading={loading || isRefreshing}>
            {item => (
                <Card
                    key={item.id}
                    title={item.id}
                    mediaCount={item.mediaCount}
                    postCount={item.postCount}
                    thumbnail={getThumbnailUrl(item.latestAttachment, 320, 180)}
                    href={`/data-sources/${item.id}/boards`}
                />
            )}
        </CardList>
    );
}

export const getServerSideProps = installRouteMiddleware<DataSourcesPageProps>({
    title: "Data Sources",
    refreshable: true,
})(async (_, { client }) => {
    const { data } = await queryDataSourceCount(client);
    if (!data) {
        throw new Error("No data returned from DataSourceCount query");
    }

    return {
        props: {
            itemCount: data.dataSourceCount,
        },
    };
});

import React from "react";

import { queryDataSource, useDataSourceBoardsQuery } from "@apollo/queries";

import { Card } from "@components/Card";
import { CardList } from "@components/CardList";

import { installRouteMiddleware } from "@utils/routes/middleware";
import { PageProps } from "@utils/routes/types";
import { getThumbnailUrl } from "@utils/attachments";

interface DataSourcePageProps extends PageProps {
    itemCount: number;
    dataSourceId: string;
}

export default function DataSourceBoards({ itemCount, dataSourceId }: DataSourcePageProps) {
    const { data, loading } = useDataSourceBoardsQuery({
        variables: {
            dataSourceId,
        },
    });

    return (
        <CardList count={itemCount} items={data?.dataSource?.boards} loading={loading}>
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

export const getServerSideProps = installRouteMiddleware<DataSourcePageProps>()(async ({ params }, { client }) => {
    const dataSourceId = params?.["data-source-id"];
    if (!dataSourceId || typeof dataSourceId !== "string") {
        throw new Error("No data source ID provided");
    }

    const { data } = await queryDataSource(client, {
        variables: {
            id: dataSourceId,
        },
    });

    if (!data.dataSource) {
        throw new Error("No data source found");
    }

    return {
        props: {
            itemCount: data.dataSource.boardCount,
            title: `'${data.dataSource.id}' Data Source`,
            dataSourceId: data.dataSource.id,
        },
    };
});

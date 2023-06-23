import React from "react";

import { queryDataSourceThreads, useDataSourceThreadsQuery } from "@apollo/queries";

import { orderThread, ThreadSort, ThreadSortOrder, ThreadToolbar } from "@components/Thread/Toolbar";
import { CardList } from "@components/CardList";
import { Card } from "@components/Card";

import { installRouteMiddleware } from "@utils/routes/middleware";
import { getThumbnailUrl } from "@utils/attachments";
import { PageProps } from "@utils/routes/types";

export interface DataSourceThreadsPageProps extends PageProps {
    dataSourceId: string;
    threadCount: number;
}

export default function DataSourceThreads({ dataSourceId, threadCount }: DataSourceThreadsPageProps) {
    const [threadOrder, setThreadOrder] = React.useState<ThreadSort>([ThreadSortOrder.CreationDate, false]);
    const { data, loading } = useDataSourceThreadsQuery({
        variables: {
            dataSourceId,
        },
    });

    const orderedThreads = React.useMemo(() => {
        if (!data?.dataSource?.threads) {
            return null;
        }

        return orderThread(data.dataSource.threads, threadOrder);
    }, [data, threadOrder]);

    return (
        <>
            <ThreadToolbar onChange={setThreadOrder} order={threadOrder[0]} reverse={threadOrder[1]} />
            <CardList count={threadCount} items={orderedThreads} loading={loading}>
                {item => (
                    <Card
                        key={item.id}
                        title={item.title || `Thread #${item.no}`}
                        description={item.content ?? ""}
                        postCount={item.replyCount}
                        mediaCount={item.attachmentCount}
                        thumbnail={getThumbnailUrl(item.attachments[0], 320, 180)}
                        href={`/threads/${item.id}`}
                    />
                )}
            </CardList>
        </>
    );
}

export const getServerSideProps = installRouteMiddleware<DataSourceThreadsPageProps>()(
    async ({ params }, { client }) => {
        const dataSourceId = params?.["data-source-id"];
        if (!dataSourceId || typeof dataSourceId !== "string") {
            throw new Error("No data source id provided");
        }

        const { data } = await queryDataSourceThreads(client, {
            variables: {
                dataSourceId,
            },
        });

        if (!data.dataSource) {
            throw new Error("No data source with given id found");
        }

        return {
            props: {
                title: "Threads",
                threadCount: data.dataSource.threads.length,
                dataSourceId,
            },
        };
    },
);

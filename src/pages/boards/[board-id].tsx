import React from "react";

import { queryBoardThreads, useBoardThreadsQuery } from "@apollo/queries";

import { CardList } from "@components/CardList";
import { Card } from "@components/Card";
import { orderThread, ThreadSort, ThreadSortOrder, ThreadToolbar } from "@components/Thread/Toolbar";
import { useRefresh } from "@components/Layout/useRefresh";

import { getThumbnailUrl } from "@utils/attachments";
import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

export interface BoardPageProps extends PageProps {
    boardId: string;
    threadCount: number;
}

export default function Board({ threadCount, boardId }: BoardPageProps) {
    const [threadOrder, setThreadOrder] = React.useState<ThreadSort>([ThreadSortOrder.CreationDate, false]);
    const { data, loading, refetch } = useBoardThreadsQuery({ variables: { boardId } });
    const isRefreshing = useRefresh(refetch);

    const orderedThreads = React.useMemo(() => {
        if (!data?.board?.threads) {
            return null;
        }

        return orderThread(data.board.threads, threadOrder);
    }, [data, threadOrder]);

    return (
        <>
            <ThreadToolbar onChange={setThreadOrder} order={threadOrder[0]} reverse={threadOrder[1]} />
            <CardList count={threadCount} items={orderedThreads} loading={loading || isRefreshing}>
                {item => (
                    <Card
                        key={item.id}
                        title={item.title || `Thread #${item.no}`}
                        description={item.content ?? ""}
                        mediaCount={item.attachmentCount}
                        postCount={item.replyCount}
                        thumbnail={getThumbnailUrl(item.attachments[0], 320, 180)}
                        href={`/threads/${item.id}`}
                    />
                )}
            </CardList>
        </>
    );
}

export const getServerSideProps = installRouteMiddleware<BoardPageProps>({
    title: "Threads",
    refreshable: true,
})(async ({ params }, { client }) => {
    const boardId = params?.["board-id"];
    if (!boardId || typeof boardId !== "string") {
        throw new Error("No board id provided");
    }

    const { data } = await queryBoardThreads(client, {
        variables: { boardId },
    });

    if (!data.board) {
        throw new Error("Board with given id not found");
    }

    return {
        props: {
            boardId: data.board.id,
            threadCount: data.board.threads.length,
        },
    };
});

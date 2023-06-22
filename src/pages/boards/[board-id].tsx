import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

import { queryBoardThreads, useBoardThreadsQuery } from "@apollo/queries";
import { CardList } from "@components/CardList";
import { Card } from "@components/Card";
import { getThumbnailUrl } from "@utils/attachments";

export interface BoardPageProps extends PageProps {
    boardId: string;
    threadCount: number;
}

export default function Board({ threadCount, boardId }: BoardPageProps) {
    const { data, loading } = useBoardThreadsQuery({
        variables: { boardId },
    });

    return (
        <CardList count={threadCount} items={data?.board?.threads} loading={loading}>
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
    );
}

export const getServerSideProps = installRouteMiddleware<BoardPageProps>("Threads")(async ({ params }, { client }) => {
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

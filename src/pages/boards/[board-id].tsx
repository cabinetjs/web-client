import { BoardPage } from "@pages/boards/[board-id]";

import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

import { queryBoardThreads, useBoardThreadsQuery } from "@apollo/queries";

export interface BoardPageProps extends PageProps {
    boardId: string;
    threadCount: number;
}

export default function Board({ threadCount, boardId }: BoardPageProps) {
    const { data, loading } = useBoardThreadsQuery({
        variables: { boardId },
    });

    return <BoardPage threadCount={threadCount} loading={loading} threads={data?.board?.threads} />;
}

export const getServerSideProps = installRouteMiddleware<BoardPageProps>()(async ({ params }, { client }) => {
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
            title: `'${data.board.name}' Board`,
        },
    };
});

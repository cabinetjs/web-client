import React from "react";

import { Container, Box } from "@mui/material";

import { ImageBoardPostView } from "@components/Post/ImageBoardPostView";
import { useLayout } from "@components/Layout/useLayout";
import { VirtualizedList } from "@components/VirtualizedList";
import { useRefresh } from "@components/Layout/useRefresh";

import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { queryThreadMetadata, useThreadQuery } from "@apollo/queries";

import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

export interface ThreadPageProps extends PageProps {
    threadId: string;
}

export default function Thread({ threadId }: ThreadPageProps) {
    const { setAttachments } = useLayout();
    const setAttachmentRef = React.useRef(setAttachments);
    const { data, loading, refetch } = useThreadQuery({ variables: { threadId } });
    const virtualizer = React.useRef<ReturnType<typeof useWindowVirtualizer> | null>(null);

    useRefresh(refetch);

    const handleVirtualizer = React.useCallback((obj: ReturnType<typeof useWindowVirtualizer>) => {
        virtualizer.current = obj;
    }, []);

    React.useEffect(() => {
        if (!data?.post) {
            return;
        }

        const allPosts = [data.post, ...data.post.replies];
        const attachments = allPosts.flatMap(post => post.attachments);

        setAttachments(attachments);
    }, [data, loading, setAttachments]);

    React.useEffect(() => {
        const setAttachment = setAttachmentRef.current;

        return () => {
            setAttachment([]);
        };
    }, []);

    if (loading) {
        return null;
    } else if (!data?.post) {
        throw new Error("Thread with given id not found");
    }

    const posts = [data.post, ...data.post.replies];

    return (
        <Container maxWidth="xl" sx={{ px: "0 !important" }}>
            <VirtualizedList items={posts} onVirtualizer={handleVirtualizer}>
                {post => (
                    <Box mb={1}>
                        <ImageBoardPostView post={post} />
                    </Box>
                )}
            </VirtualizedList>
        </Container>
    );
}

export const getServerSideProps = installRouteMiddleware<ThreadPageProps>({
    refreshable: true,
})(async ({ params }, { client }) => {
    const threadId = params?.["thread-id"];
    if (!threadId || typeof threadId !== "string") {
        throw new Error("No thread id provided");
    }

    const { data } = await queryThreadMetadata(client, {
        variables: { threadId },
    });
    if (!data.post) {
        throw new Error("Thread with given id not found");
    }

    const titleTokens = [`Thread #${data.post.no}`];
    if (data.post.title) {
        titleTokens.push(data.post.title);
    }

    return {
        props: {
            title: titleTokens.join(" - "),
            threadId: data.post.id,
        },
    };
});

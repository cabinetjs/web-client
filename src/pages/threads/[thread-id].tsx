import React from "react";

import { Stack, Container } from "@mui/material";

import { ImageBoardPostView } from "@components/Post/ImageBoardPostView";
import { useLayout } from "@components/Layout/useLayout";

import { queryThreadMetadata, useThreadQuery } from "@apollo/queries";

import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

export interface ThreadPageProps extends PageProps {
    threadId: string;
}

export default function Thread({ threadId }: ThreadPageProps) {
    const { setAttachments } = useLayout();
    const { data, loading } = useThreadQuery({
        variables: { threadId },
    });

    React.useEffect(() => {
        if (!data?.post) {
            return;
        }

        const allPosts = [data.post, ...data.post.replies];
        const attachments = allPosts.flatMap(post => post.attachments);

        setAttachments(attachments);

        return () => {
            setAttachments([]);
        };
    }, [data, loading, setAttachments]);

    if (loading) {
        return null;
    }

    if (!data?.post) {
        throw new Error("Thread with given id not found");
    }

    const posts = [data.post, ...data.post.replies];

    return (
        <Container maxWidth="xl" sx={{ px: "0 !important" }}>
            <Stack spacing={1}>
                {posts.map(post => (
                    <ImageBoardPostView key={post.id} post={post} />
                ))}
            </Stack>
        </Container>
    );
}

export const getServerSideProps = installRouteMiddleware<ThreadPageProps>()(async ({ params }, { client }) => {
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

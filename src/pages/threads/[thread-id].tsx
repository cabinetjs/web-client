import React from "react";

import { Stack, Container } from "@mui/material";

import { ImageBoardPostView } from "@components/Post/ImageBoardPostView";
import { useLayout } from "@components/Layout/useLayout";
import { useRefresh } from "@components/Layout/useRefresh";

import { FullAttachmentFragment, FullPostFragment, queryThreadMetadata, useThreadQuery } from "@apollo/queries";

import { PageProps } from "@utils/routes/types";
import { installRouteMiddleware } from "@utils/routes/middleware";

export interface ThreadPageProps extends PageProps {
    threadId: string;
}

export default function Thread({ threadId }: ThreadPageProps) {
    const { setAttachments, ...layout } = useLayout();
    const { data, loading, refetch } = useThreadQuery({ variables: { threadId } });
    const itemsRef = React.useRef<[HTMLElement, FullPostFragment][]>([]);

    useRefresh(refetch);

    const handleRef = React.useCallback(
        (el: HTMLElement | null, index: number) => {
            if (!el || !data?.post || loading) {
                return;
            }

            const posts: FullPostFragment[] = [data.post, ...data.post.replies];
            itemsRef.current[index] = [el, posts[index]];
        },
        [data, loading],
    );

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
    React.useEffect(() => {
        const handleMediaViewerChange = (attachment: FullAttachmentFragment) => {
            const target = itemsRef.current.find(([, post]) => post.attachments.some(a => a.id === attachment.id));
            if (!target) {
                return;
            }

            const [el] = target;
            layout.scrollToTop(el);
        };

        layout.addEventListener("media-viewer-change", handleMediaViewerChange);

        return () => {
            layout.removeEventListener("media-viewer-change", handleMediaViewerChange);
        };
    }, [layout]);

    if (loading) {
        return null;
    } else if (!data?.post) {
        throw new Error("Thread with given id not found");
    }

    const posts = [data.post, ...data.post.replies];

    return (
        <Container maxWidth="xl" sx={{ px: "0 !important" }}>
            <Stack spacing={1}>
                {posts.map((post, i) => (
                    <ImageBoardPostView ref={el => handleRef(el, i)} key={post.id} post={post} />
                ))}
            </Stack>
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

import { Card } from "@components/Card";
import { CardList } from "@components/CardList";

import { MinimalPostFragment } from "@apollo/queries";

import { getThumbnailUrl } from "@utils/attachments";
import { Nullable } from "@utils/types";

interface BoardPageProps {
    threadCount: number;
    threads: Nullable<MinimalPostFragment[]>;
    loading: boolean;
}

export function BoardPage({ threadCount, threads, loading }: BoardPageProps) {
    return (
        <CardList count={threadCount} items={threads} loading={loading}>
            {item => (
                <Card
                    key={item.id}
                    title={item.title || `Thread #${item.no}`}
                    description={item.content ?? ""}
                    mediaCount={item.attachmentCount}
                    postCount={item.replyCount}
                    thumbnail={getThumbnailUrl(item.attachments[0], 320, 180)}
                />
            )}
        </CardList>
    );
}

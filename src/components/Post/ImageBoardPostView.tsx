import React from "react";
import dayjs from "dayjs";
import { filesize } from "filesize";

import { Box, Typography } from "@mui/material";

import { AttachmentView } from "@components/AttachmentView";

import { Container, Content, Metadata, Root } from "@components/Post/ImageBoardPostView.styles";

import { FullPostFragment } from "@apollo/queries";
import { getAttachmentUrl, getThumbnailUrl } from "@utils/attachments";

export interface ImageBoardPostViewProps {
    post: FullPostFragment;
}

export const ImageBoardPostView = React.memo(({ post }: ImageBoardPostViewProps) => {
    const thumbnailUrl = getThumbnailUrl(post.attachments[0], 150);
    const attachment = post.attachments[0];

    return (
        <Root elevation={0} id={`p${post.no}`}>
            <Container>
                <Box flex="1 1 auto">
                    <Metadata>
                        {post.title && (
                            <Typography variant="body2" fontWeight={800} color="primary.main">
                                {post.title}
                            </Typography>
                        )}
                        <Typography variant="body2" fontWeight="inherit" color="inherit">
                            {dayjs(post.writtenAt).format("YYYY-MM-DD HH:mm:ss")}
                        </Typography>
                        <Typography variant="body2" fontWeight="inherit" color="inherit">
                            No.{post.no}
                        </Typography>
                        {attachment && (
                            <>
                                <Typography
                                    component="a"
                                    href={getAttachmentUrl(attachment) || undefined}
                                    variant="body2"
                                    fontWeight="inherit"
                                    color="inherit"
                                >
                                    {attachment.name}
                                    {attachment.extension}
                                </Typography>
                                <Typography variant="body2" fontWeight="inherit" color="inherit">
                                    ({`${filesize(attachment.size)}`})
                                </Typography>
                            </>
                        )}
                    </Metadata>
                    <Content>
                        {thumbnailUrl && (
                            <Box mr={2} flex="0 0 auto" maxWidth="50%">
                                <AttachmentView attachment={attachment} thumbnailSize={[150]} />
                            </Box>
                        )}
                        {post.content && (
                            <Typography
                                variant="body1"
                                fontWeight="inherit"
                                color="inherit"
                                fontSize="0.85rem"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        )}
                    </Content>
                </Box>
            </Container>
        </Root>
    );
});

ImageBoardPostView.displayName = "ImageBoardPostView";

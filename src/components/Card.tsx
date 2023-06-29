import React from "react";
import { stripHtml } from "string-strip-html";

import Link from "next/link";

import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

import { Description, ImageWrapper, Root, Tag, TagContainer, Thumbnail, Title } from "@components/Card.styles";

import { Nullable } from "@utils/types";

export interface NormalCardProps {
    title: string;
    description?: Nullable<string>;
    thumbnail?: Nullable<string>;
    mediaCount: number;
    postCount: number;
    href?: string;
}

export interface SkeletonCardProps {
    skeleton: boolean;
}

export type CardProps = NormalCardProps | SkeletonCardProps;

export function Card(props: CardProps) {
    let title: React.ReactNode;
    let description: React.ReactNode | null = null;
    let tags: React.ReactNode;
    let thumbnail: React.ReactNode;
    let href: string | null = null;

    if ("skeleton" in props) {
        title = <Skeleton variant="text" width="100%" />;
        description = <Skeleton variant="text" width="100%" />;
        tags = <Skeleton variant="text" width="50%" />;
        thumbnail = <Skeleton variant="rectangular" height="100%" />;
    } else {
        if (props.description) {
            description = stripHtml(props.description).result;
        }

        title = props.title;
        tags = (
            <>
                <Tooltip title="게시글 개수">
                    <Tag>
                        <QuestionAnswerRoundedIcon fontSize="small" color="inherit" />
                        <Typography variant="body2" fontSize="0.8rem" fontWeight={600}>
                            {props.postCount}
                        </Typography>
                    </Tag>
                </Tooltip>
                <Tooltip title="미디어 개수">
                    <Tag>
                        <ImageRoundedIcon fontSize="small" color="inherit" />
                        <Typography variant="body2" fontSize="0.8rem" fontWeight={600}>
                            {props.mediaCount}
                        </Typography>
                    </Tag>
                </Tooltip>
            </>
        );

        if (props.thumbnail) {
            thumbnail = <Thumbnail style={{ backgroundImage: `url(${props.thumbnail})` }} />;
        }

        href = props.href || null;
    }

    return (
        <Root component={href ? Link : undefined} href={href ?? undefined}>
            <ImageWrapper>{thumbnail}</ImageWrapper>
            <Box p={1.5} flex="1 1 auto">
                <Typography component={Title} variant="h6" fontSize="1rem" fontWeight={800} gutterBottom>
                    {title}
                </Typography>
                {description && (
                    <Typography component={Description} variant="body1" fontSize="0.85rem">
                        {description}
                    </Typography>
                )}
            </Box>
            <TagContainer>
                <Box flex="1 1 auto" />
                {tags}
            </TagContainer>
        </Root>
    );
}

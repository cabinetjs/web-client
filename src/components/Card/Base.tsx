import React from "react";

import { Skeleton, Typography } from "@mui/material";

import { Root } from "@components/Card/Base.styles";

export interface BaseCardProps {
    title: React.ReactNode;
    content: React.ReactNode;
}

export interface ChildrenBaseCardProps {
    title: React.ReactNode;
    children: React.ReactNode;
}

export interface LoadingBaseCardProps {
    loading: true;
    children?: React.ReactNode;
}

export type Props = BaseCardProps | LoadingBaseCardProps | ChildrenBaseCardProps;

export function BaseCard(props: Props) {
    let titleNode: React.ReactNode;
    let contentNode: React.ReactNode;
    let children: React.ReactNode;

    if ("loading" in props) {
        titleNode = <Skeleton variant="text" width="100%" />;

        if (props.children) {
            children = props.children;
        } else {
            contentNode = <Skeleton variant="text" width="100%" />;
        }
    } else if ("children" in props) {
        titleNode = props.title;
        children = props.children;
    } else {
        titleNode = props.title;
        contentNode = props.content;
    }

    return (
        <Root>
            <Typography variant="h6" fontWeight={600} fontSize="1rem" color="text.disabled" gutterBottom>
                {titleNode}
            </Typography>
            {children}
            {contentNode && !children && (
                <Typography variant="body1" fontWeight={800} fontSize="1.75rem">
                    {contentNode}
                </Typography>
            )}
        </Root>
    );
}

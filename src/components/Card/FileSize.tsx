import React from "react";
import { filesize } from "filesize";

import { Typography, TypographyProps } from "@mui/material";

import { BaseCard } from "@components/Card/Base";

export interface FileSizeCardProps {
    title: string;
    value: number;
    oldValue?: number;
}

export interface LoadingFileSizeCardProps {
    loading: true;
}

type Props = FileSizeCardProps | LoadingFileSizeCardProps;

export function FileSizeCard(props: Props) {
    if ("loading" in props) {
        return <BaseCard loading />;
    }

    const { value, oldValue, title } = props;
    let content: React.ReactNode = `${filesize(value)}`;
    if (oldValue && oldValue !== value) {
        const delta = value - oldValue;
        const symbol = delta > 0 ? "+" : "-";
        const deltaText = `(${symbol}${filesize(delta)})`;
        const color: TypographyProps["color"] = delta > 0 ? "success.light" : "error.light";

        content = (
            <>
                {content}
                <Typography variant="body1" component="span" fontWeight={800} color={color} sx={{ pl: 1 }}>
                    {deltaText}
                </Typography>
            </>
        );
    }

    return <BaseCard title={title} content={content} />;
}

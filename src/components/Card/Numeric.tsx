import React from "react";

import { Typography, TypographyProps } from "@mui/material";

import { BaseCard } from "@components/Card/Base";

export interface NumericCardProps {
    title: string;
    value: number;
    oldValue?: number;
}

export interface LoadingNumericCardProps {
    loading: true;
}

type Props = NumericCardProps | LoadingNumericCardProps;

export function NumericCard(props: Props) {
    if ("loading" in props) {
        return <BaseCard loading />;
    }

    const { title, value, oldValue } = props;
    let content: React.ReactNode = value.toLocaleString();
    if (oldValue && oldValue !== value) {
        const delta = value - oldValue;
        const symbol = delta > 0 ? "+" : "-";
        const deltaText = `(${symbol}${delta.toLocaleString()})`;
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

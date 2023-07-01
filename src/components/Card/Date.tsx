import React from "react";

import { Nullable } from "@utils/types";
import dayjs from "dayjs";
import { BaseCard } from "@components/Card/Base";

export interface DateCardProps {
    title: string;
    value?: Nullable<Date | string | number>;
}

export interface LoadingDateCardProps {
    loading: true;
}

type Props = DateCardProps | LoadingDateCardProps;

export function DateCard(props: Props) {
    if ("loading" in props) {
        return null;
    }

    const { value, title } = props;
    let content: React.ReactNode = "-";
    if (value) {
        content = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }

    return <BaseCard title={title} content={content} />;
}

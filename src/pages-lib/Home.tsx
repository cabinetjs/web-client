import React from "react";
import { filesize } from "filesize";

import { Container, Grid } from "@mui/material";
import { ChartDataFragment, TimeRange, TimeSpanUnit, useStatisticsQuery } from "@apollo/queries";

import { NumericCard } from "@components/Card/Numeric";
import { FileSizeCard } from "@components/Card/FileSize";
import { DateCard } from "@components/Card/Date";
import { ChartCard, ChartItemMap } from "@components/Card/Chart";

import { Root } from "@pages/Home.styles";

const CHART_LINES: ChartItemMap<ChartDataFragment> = {
    fileSize: { color: "rgb(36, 153, 239)", name: "Used Space", formatter: value => `${filesize(value)}` },
    count: { color: "rgb(39, 206, 136)", name: "Count" },
};

const CHART_BARS: ChartItemMap<ChartDataFragment> = {
    fileSizeDelta: {
        color: "rgb(36, 153, 239)",
        name: "Used Space Increment",
        formatter: value => `${filesize(value)}`,
    },
    countDelta: { color: "rgb(39, 206, 136)", name: "Count Increment" },
};

export function HomePage() {
    const { data } = useStatisticsQuery({
        variables: {
            unit: TimeSpanUnit.Minute,
            timeRange: TimeRange.Day,
            value: 30,
        },
    });

    return (
        <Root>
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 4 }}>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        {!data?.statistic && <NumericCard loading />}
                        {data?.statistic && (
                            <NumericCard
                                title="Boards"
                                value={data.statistic.boardCount}
                                oldValue={data.statistic.oldBoardCount}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        {!data?.statistic && <NumericCard loading />}
                        {data?.statistic && (
                            <NumericCard
                                title="Posts"
                                value={data.statistic.postCount}
                                oldValue={data.statistic.oldPostCount}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        {!data?.statistic && <NumericCard loading />}
                        {data?.statistic && (
                            <NumericCard
                                title="Attachments"
                                value={data.statistic.attachmentCount}
                                oldValue={data.statistic.oldAttachmentCount}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        {!data?.statistic && <FileSizeCard loading />}
                        {data?.statistic && (
                            <FileSizeCard
                                title="Estimated Used Space"
                                value={data.statistic.fileSize}
                                oldValue={data.statistic.oldFileSize}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        {!data?.statistic && <DateCard loading />}
                        {data?.statistic && (
                            <DateCard title="Last Crawl Time" value={data.statistic.lastCrawlingLog?.startedAt} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {!data?.statistic && <ChartCard loading />}
                        {data?.attachmentStatus && (
                            <ChartCard
                                title="Attachment Growth"
                                data={data.attachmentStatus}
                                lines={CHART_LINES}
                                bars={CHART_BARS}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
}

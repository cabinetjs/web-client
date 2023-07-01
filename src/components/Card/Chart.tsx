import React from "react";
import { Tooltip, CartesianGrid, Line, ResponsiveContainer, YAxis, ComposedChart, Bar, Legend } from "recharts";

import { Box, Skeleton } from "@mui/material";

import { ChartLegend } from "@components/ChartLegend";
import { ChartTooltip } from "@components/ChartTooltip";
import { BaseCard } from "@components/Card/Base";

export type ChartItemMap<T extends Record<string, string | number>> = {
    [K in Exclude<keyof T, "__typename">]?: {
        color: string;
        name: string;
        formatter?: (value: T[K]) => string;
    };
};

export interface ChartCardProps<T extends Record<string, string | number>> {
    title: string;
    data: T[];
    lines: ChartItemMap<T>;
    bars?: ChartItemMap<T>;
}

export interface LoadingChartCardProps {
    loading: boolean;
}

type Props<T extends Record<string, string | number>> = ChartCardProps<T> | LoadingChartCardProps;
type ChartItemPair<T extends Record<string, string | number>> = [
    string,
    ChartItemMap<T>[Exclude<keyof T, "__typename">],
];

interface ChartCardStates {
    focusedKey: string | null;
    disabledKeys: string[];
}

export class ChartCard<T extends Record<string, string | number>> extends React.PureComponent<
    Props<T>,
    ChartCardStates
> {
    public state: ChartCardStates = {
        focusedKey: null,
        disabledKeys: [],
    };

    private handleLegendMouseOver = (key: string) => {
        const { disabledKeys } = this.state;
        if (disabledKeys.includes(key)) {
            return;
        }

        this.setState({ focusedKey: key });
    };
    private handleLegendMouseOut = () => {
        this.setState({ focusedKey: null });
    };
    private handleLegendClick = (key: string) => {
        this.setState(prevState => {
            const { disabledKeys, focusedKey } = prevState;
            if (disabledKeys.includes(key)) {
                return { disabledKeys: disabledKeys.filter(k => k !== key), focusedKey };
            }

            return { disabledKeys: [...disabledKeys, key], focusedKey: focusedKey === key ? null : focusedKey };
        });
    };

    private renderBar = ([key, item]: ChartItemPair<T>) => {
        const { disabledKeys, focusedKey } = this.state;
        if (!item) {
            return null;
        }

        return (
            <Bar
                hide={disabledKeys.includes(key)}
                key={key}
                yAxisId={key}
                name={item.name}
                dataKey={key}
                fill={item.color}
                fillOpacity={focusedKey && focusedKey !== key ? 0.2 : 1}
                barSize={20}
            />
        );
    };
    private renderLine = ([key, item]: ChartItemPair<T>) => {
        const { disabledKeys, focusedKey } = this.state;
        if (!item) {
            return null;
        }

        return (
            <Line
                hide={disabledKeys.includes(key)}
                key={key}
                yAxisId={key}
                name={item.name}
                type="monotone"
                dataKey={key}
                stroke={item.color}
                strokeOpacity={focusedKey && focusedKey !== key ? 0.2 : 1}
                strokeWidth={4}
                dot={false}
            />
        );
    };
    private renderAxis = (key: string) => {
        return <YAxis key={key} yAxisId={key} hide />;
    };
    public render() {
        if ("loading" in this.props) {
            return (
                <BaseCard loading>
                    <Box mt={4}>
                        <Skeleton variant="rectangular" height={300} />
                    </Box>
                </BaseCard>
            );
        }

        const { title, data, lines, bars } = this.props;
        const { disabledKeys } = this.state;

        const lineEntries = Object.entries(lines);
        const barEntries = Object.entries(bars ?? {});
        const allKeys = [...lineEntries, ...barEntries].map(([key]) => key);

        return (
            <BaseCard title={title}>
                <Box height={300} mt={4}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart width={300} height={100} data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <Tooltip content={<ChartTooltip lines={lines} bars={bars} />} />
                            <Legend
                                content={
                                    <ChartLegend
                                        disabledKeys={disabledKeys}
                                        onMouseOver={this.handleLegendMouseOver}
                                        onMouseOut={this.handleLegendMouseOut}
                                        onClick={this.handleLegendClick}
                                    />
                                }
                            />
                            {allKeys.map(this.renderAxis)}
                            {lineEntries.map(this.renderLine)}
                            {barEntries.map(this.renderBar)}
                        </ComposedChart>
                    </ResponsiveContainer>
                </Box>
            </BaseCard>
        );
    }
}

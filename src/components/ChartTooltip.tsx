import React from "react";
import { TooltipProps } from "recharts";

import { Box, Card, Stack, Typography } from "@mui/material";

import { ChartItemMap } from "@components/Card/Chart";

interface ChartTooltipProps<T extends Record<string, string | number>> extends TooltipProps<any, any> {
    lines: ChartItemMap<T>;
    bars?: ChartItemMap<T>;
}

export function ChartTooltip<T extends Record<string, string | number>>({
    payload,
    lines,
    bars,
}: ChartTooltipProps<T>) {
    if (!payload || !payload.length) {
        return null;
    }

    return (
        <Card elevation={8}>
            <Box p={2}>
                <Stack spacing={2}>
                    {payload.map(item => {
                        const color = item?.color ?? item?.stroke;
                        if (!item?.dataKey || !item?.name || !color) {
                            return null;
                        }

                        const dataKey = item.dataKey;
                        const name = item.name;

                        const fieldItem = lines[dataKey] ?? bars?.[dataKey] ?? null;
                        if (!fieldItem) {
                            return null;
                        }

                        let data = item.payload[dataKey];
                        if (fieldItem.formatter) {
                            data = fieldItem.formatter(data);
                        } else if (typeof data === "number") {
                            data = data.toLocaleString();
                        }

                        return (
                            <Box key={item.name} display="flex" fontSize="0.9rem" alignItems="center">
                                <Box
                                    width={8}
                                    height={8}
                                    mr={2}
                                    sx={{ borderRadius: "100%", backgroundColor: color }}
                                />
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontSize="inherit"
                                    lineHeight={1}
                                    fontWeight={600}
                                    sx={{ mr: 2, flex: "1 1 auto" }}
                                >
                                    {name}
                                </Typography>
                                <Typography variant="body1" lineHeight={1} fontSize="inherit" fontWeight={600}>
                                    {data}
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </Box>
        </Card>
    );
}

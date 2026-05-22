"use client"

import { CHART_COLORS } from "@/shared/constants/colors";
import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
    [key: string]: any;
}

interface DonutChartProps {
    data: DataItem[];
    dataKey: string;
    nameKey: string;
    colors?: string[];
    innerRadius?: number;
    outerRadius?: number;
    height?: string;
}



export function DonutChart({
    data,
    dataKey = "value",
    nameKey = "name",
    colors = CHART_COLORS,
    innerRadius = 60,
    outerRadius = 80,
    height = "h-64"
}: Readonly<DonutChartProps>) {

    // inyectamos el color en los datos
    const processedData = useMemo(() => {
        return data.map((item, index) => ({
            ...item,
            fill: colors[index % colors.length],
        }));
    }, [data, colors]);

    return (
        <div className={`w-full min-h-64`}>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>
                    <Pie
                        data={processedData}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={5}
                    />
                    <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
"use client"

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface ChartCircularProgressProps {
    percentage: number;
    label?: string;
    color?: string;
}

const SIZE_MAP = {}

export function ChartCircularProgress({ percentage, label, color }: Readonly<ChartCircularProgressProps>) {

    // normalizar el porcentaje. entre 0-100
    const safePercentage = Math.max(0, Math.min(100, percentage));

    const getStatusColor = (percentage: number) => {
        if (percentage <= 70) return "#10b981";
        else if (percentage <= 90) return "#f59e0b"
        return "#ef4444"
    }

    const data = [{
        name: label || "",
        value: safePercentage,
        fill: color ?? getStatusColor(safePercentage),
    }]

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: 180, height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="75%" // Hace el "anillo" delgado
                    outerRadius="100%"
                    barSize={16}
                    data={data}
                    startAngle={90}    // Empieza en la parte superior (12 en punto)
                    endAngle={-270}    // Gira 360° en sentido antihorario
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}    // oculta etiquetas
                    />

                    {/* anillo gris */}
                    <RadialBar
                        background={{ fill: '#e2e8f0', opacity: 0.4 }}
                        dataKey="value"
                        cornerRadius={16 / 2} // Bordes redondeados
                        min={0}
                        max={100}
                    />
                    {/*progreso*/}
                    <RadialBar
                        dataKey="value"
                        cornerRadius={16 / 2}
                        min={0}
                        max={100}
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            {/*texto central*/}
            <div className="absolute flex flex-col items-center pointer-events-none">
                <span className={`font-bold text-2xl text-gray-900 dark:text-white`}>
                    {safePercentage.toFixed(1)}%
                </span>
                {label && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {label}
                    </span>
                )}
            </div>
        </div>
    )
}
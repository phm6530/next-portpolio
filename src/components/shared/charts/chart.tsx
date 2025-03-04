"use client";

import { ChartColumn, TrendingUp, UserRound } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RespondentsData } from "@/types/template.type";

const chartConfig = {
  male: {
    label: "남성",
    color: "hsl(var(--chart-4))",
  },
  female: {
    label: "여성",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Chart({
  isAgeColltected,
  isGenderCollected,
  female,
  male,
  selectUserCnt,
}: { isGenderCollected: boolean; isAgeColltected: boolean } & RespondentsData) {
  const chunk = Array.from({ length: 6 });
  const chartData = chunk.map((_, idx) => {
    return {
      generation: `${idx + 1}0대`,
      male: male[`${idx + 1}0`] ?? 0,
      female: female[`${idx + 1}0`] ?? 0,
    };
  });

  return (
    <Card className="dark:bg-zinc-900 bg-zinc-50">
      <CardHeader>
        {/* <CardTitle>Bar Chart - Stacked + Legend</CardTitle> */}
        <CardDescription className="flex gap-2 items-center">
          {/* <ChartColumn /> */}
          <div className="flex gap-2 font-medium leading-none text-zinc-800 dark:text-zinc-100">
            <UserRound className="h-4 w-4" /> 참여자 연령대 분포 현황{" "}
          </div>
        </CardDescription>
      </CardHeader>
      {isGenderCollected && isAgeColltected && (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 30,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="generation"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="female" fill="var(--color-female)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(v: number) => (v === 0 ? null : `${v}명`)}
                />
              </Bar>
              <Bar dataKey="male" fill="var(--color-male)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(v: number) => (v === 0 ? null : `${v}명`)}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          전체 응답자 <span>|</span> {selectUserCnt} 명
        </div>
        <div className="leading-none text-muted-foreground">
          성별 필터를 체크한 템플릿에만 차트가 제공됩니다.
        </div>
      </CardFooter>
    </Card>
  );
}

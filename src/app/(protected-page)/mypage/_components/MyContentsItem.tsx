"use client";
import classes from "./MyContentsItem.module.scss";
import MyContentsController from "./MycontentsController";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import TransformPlainText from "@/components/TransformPlainText";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GenderChart from "@/components/Chart/GenderChart";
import { Clock7, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Component } from "@/components/Chart/TestChart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  male: {
    label: "남자",
  },
  female: {
    label: "여자",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function MyContentsItem({
  item,
}: {
  item: TemplateItemMetadata<RespondentsAndMaxGroup>;
}) {
  console.log(item);

  const chartData = [
    {
      gender: "male",
      visitors: item.respondents.participants.male,
    },
    {
      gender: "female",
      visitors: item.respondents.participants.female,
      fill: "var(--color-safari)",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>
          <TransformPlainText html={item.description} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={classes.templateHeader}>
          <Component />
          <GenderChart
            maleCnt={item.respondents.participants.male}
            femaleCnt={item.respondents.participants.female}
          />
          <Card>
            <CardHeader>
              <CardDescription className="text-base text-color-base">
                성별 참여도
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full h-[100px]">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: 0,
                  }}
                >
                  <YAxis
                    dataKey="gender"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig[value as keyof typeof chartConfig]?.label
                    }
                  />
                  <XAxis dataKey="visitors" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="visitors" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <div className="flex items-center gap-[10px] text-[12px] text-muted-foreground">
            <Clock7 className="w-4 h-4" />
            생성일 :<span>{item.createdAt}</span>
          </div>
        </div>

        <MyContentsController templateType={item.templateType} id={item.id} />
      </CardContent>
    </Card>
  );
}

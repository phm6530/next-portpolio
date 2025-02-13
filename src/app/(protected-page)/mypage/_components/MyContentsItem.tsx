"use client";
import classes from "./MyContentsItem.module.scss";
import MyContentsController from "./MycontentsController";
import {
  RespondentsAndMaxGroup,
  RespondentsData,
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
  item: TemplateItemMetadata<RespondentsData>;
}) {
  const chartData = [
    {
      gender: "male",
      visitors: item.respondents.male,
    },
    {
      gender: "female",
      visitors: item.respondents.female,
      fill: "var(--color-safari)",
    },
  ];

  return (
    <Card className="aos-hidden">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>
          <TransformPlainText html={item.description} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={classes.templateHeader}>
          <Component />

          <div className="flex items-center gap-[10px] text-[12px] text-muted-foreground">
            <Clock7 className="w-4 h-4" />
            생성일 :<span>{item.createAt}</span>
          </div>
        </div>

        <MyContentsController templateType={item.templateType} id={item.id} />
      </CardContent>
    </Card>
  );
}

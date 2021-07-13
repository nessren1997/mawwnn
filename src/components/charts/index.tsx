import React, { useEffect, useState } from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";
import { Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { RootState } from "../../redux/store";
import { FetchProductsStatisticsAsync, FetchBuyersStatisticsAsync } from "../../redux/statistics";

import months from "./months.json";
import "./style.less";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Tooltip
);

const { Title } = Typography;

var myChart1: Chart;
var myChart2: Chart;

interface chart_data {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[]; borderWidth: number }[];
}

export const HomeChart = () => {
  const dispatch = useDispatch();
  const { lang, t } = useTranslation("common");
  const { products_data, buyers_data } = useSelector((state: RootState) => state.Statistics);

  const [products_statistics, setproducts_statistics] = useState<chart_data>({
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: [], borderWidth: 0 }],
  });

  const [buyer_statistics, setbuyer_statistics] = useState<chart_data>({
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: [], borderWidth: 0 }],
  });

  useEffect(() => {
    dispatch(FetchProductsStatisticsAsync());
    dispatch(FetchBuyersStatisticsAsync());
  }, []);

  useEffect(() => {
    if (window) {
      var ctx1 = document.getElementById("myChart1") as HTMLCanvasElement;
      myChart1 && myChart1.destroy();
      myChart1 = new Chart(ctx1, {
        type: "bar",
        data: products_statistics,
        options: {
          scales: {
            xAxes: { ticks: { display: false } },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, [products_statistics]);

  useEffect(() => {
    if (window) {
      var ctx2 = document.getElementById("myChart2") as HTMLCanvasElement;
      Chart.register(BarElement, LinearScale);
      myChart2 && myChart2.destroy();
      myChart2 = new Chart(ctx2, {
        type: "bar",
        data: buyer_statistics,
        options: {
          scales: {
            xAxes: { ticks: { display: false } },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, [buyer_statistics]);

  useEffect(() => {
    //get data from products_data and map it
    let newlables: string[] = [];
    let newdata: number[] = [];
    for (let i = 0; i < products_data?.length; i++) {
      newlables.push((months as any).find((el: any) => el.number === Number(products_data[i]?.month)).name);
      newdata.push(Number(products_data[i]?.count));
    }
    setproducts_statistics({
      labels: [...newlables],
      datasets: [
        {
          label: "",
          data: [...newdata],
          backgroundColor: ["#c19a4b", "#ffdb96", "#275E9F", "#9BB0BF", "#DE9D7A", "#504735"],
          borderWidth: 1,
        },
      ],
    });
  }, [products_data, lang]);

  useEffect(() => {
    //get data from buyers_data and map it
    let newlables: string[] = [];
    let newdata: number[] = [];
    for (let i = 0; i < buyers_data?.length; i++) {
      newlables.push(buyers_data[i].email);
      newdata.push(Number(buyers_data[i]?.orders_count));
    }
    setbuyer_statistics({
      labels: [...newlables],
      datasets: [
        {
          label: "",
          data: [...newdata],
          backgroundColor: ["#8D6E6A", "#BEBA93", "#58777C", "#9FC6F9", "#020B1E", "#175D91"],
          borderWidth: 1,
        },
      ],
    });
  }, [buyers_data, lang]);

  return (
    <Row justify="space-around" style={{ padding: "20px 0px" }} gutter={[24, 24]}>
      <Col lg={12} xs={24}>
        <div className="container">
          <Title level={2}>{t`products_statistics`}</Title>
          {products_data && <canvas id="myChart1"></canvas>}
        </div>
      </Col>
      <Col lg={12} xs={24}>
        <div className="container">
          <Title level={2}>{t`buyer_statistics`}</Title>
          {buyers_data && myChart2 && <canvas id="myChart2"></canvas>}
        </div>
      </Col>
    </Row>
  );
};

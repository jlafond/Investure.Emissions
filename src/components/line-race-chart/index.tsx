import ReactECharts from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import { CountryEmission } from "../../types";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import "./styles.scss";
import { MdHeight } from "react-icons/md";

export const LineChart = () => {
    const [chartOptions, setChartOptions] = useState<any>({});

    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const yearRange: [number, number] = useSelector(
        (state: RootState) => state.yearRange.YearRange
    );

    useEffect(() => {
      const filteredData = data.filter(country => countries.some(item => item===country.name));

      const flatData = Array.from(
        new Set(filteredData.flatMap((country) => country.values.filter(data => Number(data.year) >= yearRange[0] && Number(data.year) <= yearRange[1]).map((v) => v.year)))
      ).sort();
      
      const series = filteredData.map((country) => ({
        name: country.name,
        type: "line",
        showSymbol: false,
        smooth: true,
        endLabel: {
          show: true, 
          formatter: "{a}",
          color: "#f4f7fa", 
          fontSize: 14, 
          fontWeight: "bold", 
        },
        emphasis: { focus: "series" },
        data: flatData.map((year) => {
          const value = country.values.find((v) => v.year === year)?.value || 0;
          return value;
        }),
      }));

      setChartOptions({
          animationDuration: 2000,
          animationEasing: "cubicInOut",
          title: {
            text: "Greenhouse Gas Emissions by Year",
            left: "center",
            textStyle: { color: "#f4f7fa" }, 
          },
          tooltip: {
            trigger: "axis", 
          },
          legend: {
            top: "5%",
            textStyle: { color: "#f4f7fa" }, 
          },
          xAxis: {
            type: "category",
            name: "Year",
            nameLocation: "middle",
            data: flatData,
            nameTextStyle: {
              fontSize: 14,
              padding: 15,
            },
            axisLine: { lineStyle: { color: "#f4f7fa" } }, 
            axisLabel: { color: "#f4f7fa" },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: "#f4f7fa" } },
            axisLabel: { color: "#f4f7fa" },
          },
          graphic: {
            type: "text",
            left: "center", 
            bottom: "1%", 
            style: {
              text: "*Total greenhouse gas emissions excluding LULUCF (Mt CO2e)",
              fontSize: 12,
              fill: "gray",
            },
          },
          series
      });
    }, [data, countries, yearRange]);

    const shouldShow = countries.length > 0;

    return (
        <div className={shouldShow ? "line_chart_container" : "hidden"} style={{height: "100%"}}>
          { shouldShow &&
            <ReactECharts
              key={JSON.stringify(chartOptions)}
              option={chartOptions}
              style={{ height: "600px", width: "100%" }}
              className="line_chart"
            />
          }
        </div>
      );
        

}
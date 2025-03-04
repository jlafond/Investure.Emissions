import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import "./styles.scss";
import { CountryEmission } from "../../types/CountryEmission";

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
    const isPerCapita: boolean = useSelector(
      (state: RootState) => state.isPerCapita.isPerCapita
    );

    const theme = useSelector((state: RootState) => state.theme.theme);

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
          color: theme === "light" ? "#022d5b" : "#f4f7fa", 
          fontSize: 14, 
          fontWeight: "bold", 
        },
        emphasis: { focus: "series" },
        data: flatData.map((year) => {
          const value = isPerCapita ? country.values.find((v) => v.year === year)?.perCapita || 0 : country.values.find((v) => v.year === year)?.value || 0;
          return value;
        }),
      }));

      const textColor = theme === "light" ? "#022d5b" : "#f4f7fa";

      setChartOptions(GetChartOptions(series, textColor, flatData, isPerCapita));
    }, [data, countries, yearRange, theme, isPerCapita]);

    const shouldShow = countries.length > 0;

    return (
        <div className="line_chart_container" style={{height: "100%"}}>
          { shouldShow &&
            <ReactECharts
              key={JSON.stringify(chartOptions) + theme}
              option={chartOptions}
              style={{ height: "600px", width: "100%" }}
              className="line_chart"
            />
          }
        </div>
      );
}

const GetChartOptions = (series: any, textColor: string, flatData: string[], isPerCapita: boolean) => (
  {
    animationDuration: 2000,
    animationEasing: "cubicOut",
    title: {
      text: "Greenhouse Gas Emissions by Year",
      left: "center",
      textStyle: { color: textColor }, 
    },
    tooltip: {
      trigger: "axis", 
    },
    legend: {
      top: "5%",
      textStyle: { color: textColor }, 
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
      axisLine: { lineStyle: { color: textColor } }, 
      axisLabel: { color: textColor },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: textColor } },
      axisLabel: { color: textColor },
    },
    graphic: {
      type: "text",
      left: "center", 
      bottom: "0", 
      style: {
        text: `*Total greenhouse gas emissions excluding LULUCF (Mt CO2e) ${isPerCapita ? "per 1 million residents" : ""}`,
        fontSize: 12,
        fill: "gray",
      },
    },
    series
  }
)
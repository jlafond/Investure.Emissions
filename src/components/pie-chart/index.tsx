import "./styles.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { YearSlider } from "../year-slider";
import { CountryEmission } from "../../types/CountryEmission";



export const PieChartYearAverage = () => {

    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const yearRange: [number, number] = useSelector(
        (state: RootState) => state.yearRange.YearRange
    );

    const theme = useSelector((state: RootState) => state.theme.theme);
    const textColor = theme === "light" ? "#022d5b" : "#f4f7fa";


    const pieData = useMemo(() => {
        const filteredData = data.filter(country => countries.some(item => item===country.name));
        const totalYears = yearRange[1] - yearRange[0];
        return filteredData.map((country) => ({
          name: country.name,
          value: Number((country.values.filter(data => Number(data.year) >= yearRange[0] && Number(data.year) <= yearRange[1])
                .reduce((sum, record) => sum + record.value, 0) / totalYears).toFixed(4)),
        }));
      }, [data, countries, yearRange]);

    const options = getCustomSliderOptions(textColor, "Emissions Yearly Average", pieData);

    const shouldShow = countries.length > 0;

    return (
        <>
            { shouldShow && <ReactECharts className="pie_chart" option={options} style={{  }} /> }
        </>
    );

}

export const PieChartYearSlider = () => {
    const [sliderYear, setSliderYear] = useState(Number(import.meta.env.VITE_END_YEAR));
    const theme = useSelector((state: RootState) => state.theme.theme);
    const textColor = theme === "light" ? "#022d5b" : "#f4f7fa";
    
    const handleSliderChange = (value: number) => {
        setSliderYear(value);
    }

    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );

    const pieData = useMemo(() => {
        const filteredData = data.filter(country => countries.some(item => item===country.name));
        return filteredData.map((country) => ({
          name: country.name,
          value: country.values.find(data => Number(data.year) === sliderYear)?.value ?? 0,
        }));
      }, [data, countries, sliderYear]);

    const options = getCustomSliderOptions(textColor, `Emissions For Year: ${sliderYear}`, pieData);

    const shouldShow = countries.length > 0;

    return (
        <>
            { shouldShow && 
                <div>
                    <ReactECharts className="pie_chart" option={options} style={{  }} />
                    <YearSlider onChange={handleSliderChange} />
                </div>
            }
        </>
    );


}

const getCustomSliderOptions = (textColor: string, title: string, pieData: { name: string; value: number; }[]) => ({
    title: {
        text: title,
        left: "center",
        textStyle: { color: textColor }, 
    },
    tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
    },
    series: [
    {
        name: "Country",
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        data: pieData,
        label: {
            color: textColor
          },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
            },
        },

    },
    ],
});
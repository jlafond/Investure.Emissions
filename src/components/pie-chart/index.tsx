import "./styles.scss";
import { CountryEmission } from "../../types";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { YearSlider } from "../year-slider";



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

    const pieData = useMemo(() => {
        const filteredData = data.filter(country => countries.some(item => item===country.name));
        const totalYears = yearRange[1] - yearRange[0];
        return filteredData.map((country) => ({
          name: country.name,
          value: country.values.filter(data => Number(data.year) >= yearRange[0] && Number(data.year) <= yearRange[1])
                    .reduce((sum, record) => sum + record.value, 0) / totalYears,
        }));
      }, [data, countries, yearRange]);

    const options = {
        title: {
            text: "Emissions Yearly Average",
            left: "center",
            textStyle: { color: "#f4f7fa" }, 
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
        {
            name: "Countries",
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            data: pieData,
            label: {
                color: "#f4f7fa"
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
    };

    const shouldShow = countries.length > 1;

    return (
        <div>
            { shouldShow && <ReactECharts className="pie_chart" option={options} style={{  }} /> }
        </div>
    );

}

export const PieChartYearSlider = () => {
    const [sliderYear, setSliderYear] = useState(2023);

    
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
          value: country.values.find(data => Number(data.year) === sliderYear)?.value,
        }));
      }, [data, countries, sliderYear]);

    const options = {
        title: {
            text: `Emissions For Year: ${sliderYear}`,
            left: "center",
            textStyle: { color: "#f4f7fa" }, 
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
        {
            name: "Countries",
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            data: pieData,
            label: {
                color: "#f4f7fa"
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
    };

    const shouldShow = countries.length > 1;

    return (
        <div>
            { shouldShow && 
                <div>
                    <ReactECharts className="pie_chart" option={options} style={{  }} />
                    <YearSlider onChange={handleSliderChange} />
                </div>
            }
        </div>
    );


}

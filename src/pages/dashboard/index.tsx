import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../store/store'
import { fetchCountries } from '../../store/slices/CountryEmissionSlice'
import { ContentMenu } from '../../components/content-menu'
import { LineChart } from '../../components/line-race-chart'
import "./styles.scss";
import { PieChartYearAverage, PieChartYearSlider } from '../../components/pie-chart'
import { CountryStats } from '../../components/country-stats'
import { useSelector } from 'react-redux'



const Dashboard =()=>{

    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const shouldShow = countries.length > 0;

    const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(fetchCountries())
      }, []);

      return (
        <section id="dashboard" className="dashboard">
            <ContentMenu />
            {
                shouldShow && 
                <div className='dashboard__container fade-in'>
                    <div className='dashboard__container__top_container'>
                        <div className='dashboard__container__top_container__line_chart '>
                            <LineChart />
                        </div>

                        <div className='dashboard__container__top_container__pie_charts'>
                            <div className='dashboard__container__pie_charts__yearly_average'>
                                <PieChartYearAverage />
                            </div>
                            <div className='dashboard__container__pie_charts__by_year'>
                                <PieChartYearSlider />
                            </div>
                        </div>
                    </div>
                    <CountryStats />
                </div>
            }
        </section>
      )

}

export default Dashboard;
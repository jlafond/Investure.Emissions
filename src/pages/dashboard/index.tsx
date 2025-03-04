import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../store/store'
import { fetchCountries } from '../../store/slices/CountryEmissionSlice'
import { ContentMenu } from '../../components/content-menu'
import { LineChart } from '../../components/line-race-chart'
import "./styles.scss";
import { PieChartYearAverage, PieChartYearSlider } from '../../components/pie-chart'
import { CountryStats } from '../../components/country-stats'
import { useSelector } from 'react-redux'
import EmissionTable from '../../components/dashboard-table'
import { CountryEmission } from '../../types/CountryEmission'

//Dashboard landing page for application. 
// Initial state gives set of filters: Countries and Years
// Once Countries are select full dashboard is rendered. Based on length of selected countries.
const Dashboard = () => {

    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );
    const shouldShow = countries.length > 0;
    const isLoaded = data.length > 0; //Show loading dots

    //Download all relevant information asynchronously. Using Redux store.
    const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(fetchCountries())
      }, []);

      return (
        <section id="dashboard" className="dashboard">
            <ContentMenu />
            {
                shouldShow && 
                (isLoaded ?
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
                    <EmissionTable />
                </div>
                :
                <div className='dashboard__loading'>
                    <span className='dashboard__loading__dots'></span>
                    <span className='dashboard__loading__dots'></span>
                    <span className='dashboard__loading__dots'></span>
                </div>)
            }
        </section>
      )
}

export default Dashboard;
import { useEffect, useState } from 'react'
import { store, useAppDispatch } from '../../store/store'
import { fetchCountries } from '../../store/slices/CountryEmissionSlice'
import ContentMenu from '../../components/content-menu'
import PageHeaderContent from '../../components/page-header-content'
import { LineChart } from '../../components/line-race-chart'
import "./styles.scss";
import { Animate } from 'react-simple-animate'
import { PieChartYearAverage, PieChartYearSlider } from '../../components/pie-chart'



const Dashboard =()=>{

    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        setIsClicked(true);
      };

    const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(fetchCountries())
      }, []);

      return (
        <section id="dashboard" className="dashboard">
            <PageHeaderContent headerText="Dashboard"/>
            <ContentMenu onButtonClick={handleButtonClick} />
            {
                isClicked && 
                <div className='dashboard__container fade-in'>
                    
                        <div className='dashboard__container__line_chart '>
                            <LineChart />
                        </div>

                        <div className='dashboard__container__pie_charts'>
                            <div className='dashboard__container__pie_charts__yearly_average'>
                                <PieChartYearAverage />
                            </div>
                            <div className='dashboard__container__pie_charts__by_year'>
                                <PieChartYearSlider />
                            </div>
                        </div>
                </div>
            }
        </section>
      )

}

export default Dashboard;
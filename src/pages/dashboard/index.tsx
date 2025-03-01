import { useEffect, useState } from 'react'
import { store, useAppDispatch } from '../../store/store'
import { fetchCountries } from '../../store/slices/CountryEmissionSlice'
import ContentMenu from '../../components/content-menu'
import PageHeaderContent from '../../components/page-header-content'
import { LineChart } from '../../components/line-race-chart'
import "./styles.scss";


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
                <div className='lineRaceChartContainer'>
                    <LineChart />
                </div>
            }
        </section>
      )

}

export default Dashboard;
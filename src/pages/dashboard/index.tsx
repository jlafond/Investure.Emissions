import { useEffect } from 'react'
import { store, useAppDispatch } from '../../store/store'
import { fetchCountries } from '../../store/slices/CountryEmissionSlice'
import ContentMenu from '../../components/content-menu'
import PageHeaderContent from '../../components/page-header-content'

const Dashboard =()=>{

    const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(fetchCountries())
        console.log(JSON.stringify(store.getState()).length);
      });

      return (
        <section id="dashboard" className="dashboard">
            <PageHeaderContent headerText="Dashboard"/>
            <ContentMenu />
        </section>
      )

}

export default Dashboard;
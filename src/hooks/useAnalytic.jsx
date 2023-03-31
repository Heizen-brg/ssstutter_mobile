import React,{useEffect} from 'react'
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';
const TRACKING_ID = "UA-126233540-1";

const useAnalytic = () => {
  const location = useLocation()
  useEffect(() => {
    const TRACKING_ID = "UA-126233540-1";

    ReactGA.initialize(TRACKING_ID,{ standardImplementation: true });
  }, [])
  

  useEffect(() => {
    const currentPath = location.pathname + location.search
    ReactGA.set({ page: currentPath })
    ReactGA.pageview(currentPath);
  }, [location])

}

export default useAnalytic
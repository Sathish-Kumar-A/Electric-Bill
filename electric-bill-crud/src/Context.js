import React, { useState, useContext, createContext, useEffect } from 'react';
import { getRecords } from './api/api';
import { useLocation } from 'react-router-dom';

const EbContext = createContext(null);

export const Context = ({ children }) => {
    // const [EbRecords, setEBRecords] = useState([]);
    const [EbRecord, setEBRecord] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState(false);
    const { pathname } = useLocation();
    let page=pathname.split("/")[1] ||1;

    useEffect(() => {
        (async () => {
            let response = await getRecords({});
            if (response.success) {
                setEBRecord(response.data["records"]);
                setTotalPages(response.data["totalPages"]);
            }
        })()
    }, []);

    const refresh = async () => { 
        let response = await getRecords({page:page,limit:9});
        if(response.success) {
            setEBRecord(response.data["records"]);
            setTotalPages(response.data["totalPages"]);
        }
    }

  return (
      <EbContext.Provider value={{EbRecord,setEBRecord,refresh,totalPages,sort,setSort}}>
          {
                children
          } 
      </EbContext.Provider>
  )
}

export const useEBData = () => useContext(EbContext);

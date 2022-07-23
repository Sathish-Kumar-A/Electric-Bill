import React, { useState, useContext, createContext, useEffect } from 'react';
import { getRecords } from './api/api';

const EbContext = createContext(null);

export const Context = ({ children }) => {
    // const [EbRecords, setEBRecords] = useState([]);
    const [EbRecord, setEBRecord] = useState([]);

    useEffect(() => {
        (async () => {
            let response = await getRecords({});
            if(response.success) {
                setEBRecord(response.data);
            }
        })()
    }, []);

    const refresh = async () => { 
        let response = await getRecords({});
        if(response.success) {
            setEBRecord(response.data);
        }
    }

  return (
      <EbContext.Provider value={{EbRecord,setEBRecord,refresh}}>
          {
                children
          } 
      </EbContext.Provider>
  )
}

export const useEBData = () => useContext(EbContext);

import React from 'react';
import toast from "react-hot-toast";
import { useEBData } from '../Context';
import { getRecords } from '../api/api';
import {useNavigate,useLocation} from 'react-router-dom';
import { Record } from './Record';
import { useEffect } from 'react';

export const Home = () => {
    const headers = ["","Bill Date", "Paid Date", "Unit Consumed", "Amount",""];
    const { EbRecord, setEBRecord, totalPages, refresh,} = useEBData();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    let page = pathname.split("/")[1] || 1;
    const paginateArray = Array(totalPages).fill(0);
    
    useEffect(() => {
            (async () => {
                await refresh(); 
            })()
    },[page])

    const sortByAmount = async() => {
        let response = await getRecords({sort:"amount",page:page});
        if (response.success) {
            setEBRecord(response.data["records"]);
                toast.success("Sorted");
        }
            else {
                toast.error("Unable to sort");
        }
     }
  return (
      <div className='w-full bg-primary'>
          <div className='flex items-center justify-between py-4'>
              <p className='text-[18px] font-bold'>Manage Electric Bill</p>
              <div className='flex'>
                  <button className='bg-blue-700 mr-4 py-2 px-5 rounded-lg text-white' onClick={() => navigate("/addbill")}>Add Bill</button>
                  <button className='bg-yellow-500 py-2 px-5 rounded-lg text-white' onClick={sortByAmount} >Sort</button>
              </div>
          </div>
          <div className='w-full border overflow-x-auto bg-white'>
            <table className='w-full'>
                <thead className='bg-yellow-400 text-white'>
                <tr>
                    {
                        headers.map((header, index) => { 
                                return <th key={index} className="pl-4 text-start font-bold py-4">{header}</th>
                        })
                    } 
                    </tr>
                </thead>
                {
                    EbRecord.length>0&&<tbody>
                    {
                        EbRecord.map((record, index) => { 
                            return <Record
                                key={index}
                                billDate={record.billDate}
                                paidDate={record.paidDate}
                                unitConsumed={record.unitConsumed}
                                amount={record.amount}
                                id={record._id}
                            />
                        })
                    }
                </tbody>
                }
            </table>
            {EbRecord.length===0 && <p className='text-center py-5'>No Records</p>}
              
          </div>
          <div className='flex space-x-3 pb-3 w-[200px] overflow-auto my-2 mx-auto'>
              {
              paginateArray.map((page, index) => { 
                  return (
                      <p className='bg-orange-400 px-2 py-1 text-white rounded-sm cursor-pointer' key={index} onClick={()=>navigate(`/${index+1}`)}>{index+1}</p>
                  )
              })
          }
          </div>
    </div>
  )
}

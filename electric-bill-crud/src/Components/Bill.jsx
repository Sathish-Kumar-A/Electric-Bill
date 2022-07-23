import React, { useEffect,useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { useEBData } from '../Context';
import { updateRecord,getRecords } from '../api/api';
import toast from "react-hot-toast";
import { BackBtn } from './Elements/BackBtn';


export const KeyValue = ({ Key, value,name,onChange,type,isEdit }) => { 


    return (
        <div>
            <div className='flex items-center p-4 hover:bg-primary'>
            <h1 className='w-1/2 font-medium'>{Key}</h1>
                {isEdit ? <input type={type} className='border p-3 outline-none rounded-md w-[200px]' name={name} value={value} onChange={onChange} />:<h1>{value}</h1>}
            </div>
            {/* <hr /> */}
        </div>
    )
}

export const Bill = () => {
    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    const isEdit = pathname.includes("edit");
    console.log(isEdit);
    const { EbRecord,setEBRecord,refresh } = useEBData();
    let billId = search.split("=")[1];
    const findById = (id) => {
        let record = EbRecord.find(record => record._id === id);
        console.log(record);
        if (record) {
            return record
        }
        else {
            return {
        billDate: '',
        paidDate: '',
        unitConsumed: 0,
                amount: 0,
        _id:billId
    }
        }
    }
    const [data, setData] = useState(findById(billId));
    console.log(data);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const modifyRecord = async () => { 
        let response = await updateRecord(billId,data);
        if(response.success) {
            // let newawait getRecords({});
            await refresh();
            toast.success("Record Updated");
            navigate("/");
        }
        else {
            toast.error("Unable to update");
        }
    }

    
  return (
      <div className='mx-auto pt-10'>
          <div className='flex items-center py-4'>
              <p className='font-bold text-[18px] mr-3'>Bill Number:</p>
              <p className='italic text-red-400'>({billId})</p>
          </div>
          <div className='border rounded-lg bg-white'>
              <KeyValue Key='Bill Date' name="billDate" type="date" value={data["billDate"]} onChange={handleChange} isEdit={isEdit} />
              <KeyValue Key='Paid Date' name="paidDate" type="date" value={data["paidDate"]} onChange={handleChange} isEdit={isEdit}/>
              <KeyValue Key='Unit Consumed' name="unitConsumed" type="number" value={data["unitConsumed"]} onChange={handleChange} isEdit={isEdit}/>
              <KeyValue Key='Amount' name="amount" type="number" value={data["amount"]} onChange={handleChange} isEdit={isEdit}/>
              
          </div>
          <div className='mt-4 flex'>
              {isEdit && <button className=' bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-primary-dark mr-4' onClick={modifyRecord}>Save</button>}
              <BackBtn />
          </div>
    </div>
  )
}

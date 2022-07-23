import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEBData } from '../Context';
import { createRecord } from '../api/api';
import { KeyValue } from './Bill';
import { BackBtn } from './Elements/BackBtn';
import toast from "react-hot-toast";

export const AddBill = () => {
    const navigate = useNavigate();
    const { refresh } = useEBData();
    const [data, setData] = useState({
        billDate: '',
        paidDate: '',
        unitConsumed: 0,
        amount: 0,
    });

    const inputs = [{
        name: 'billDate',
        label: 'Bill Date',
        type: 'date',
    },
    {
        name: 'paidDate',
        label: 'Paid Date',
        type: 'date',
    },
    {
        name: 'unitConsumed',
        label: 'Unit Consumed',
        type: 'number',
    }, {
        name: 'amount',
        label: 'Amount',
        type: 'number',
        }];
    
    const createNewRecord = async () => {
        let response = await createRecord(data);
        if (response.success) {
            toast.success("Record Created");
            await refresh()
            navigate("/");
        }
        else {
            toast.error("Unable to create");
        }
    }
    return (
        <div className='py-5'>  
            <p className='font-bold text-[24px]'>Create New Bill</p> 
            <div className='bg-white rounded-lg my-5'>
        <div className='p-5'>
            {
                inputs.map(({name,label,type},index)=> { 
                    return (
                        <KeyValue
                            key={index}
                            name={name}
                            Key={label}
                            type={type}
                            value={data[name]}
                            onChange={(e) => setData({ ...data, [name]: e.target.value })}
                            isEdit={true}
                        />
                    )
                })
            }
        </div>
            </div>
            <div className='flex'>
                <button className='bg-yellow-400 text-white py-2 px-5 rounded-md mr-5' onClick={createNewRecord}>Create</button>
                <BackBtn />
            </div>
            </div>      
            
  )
}

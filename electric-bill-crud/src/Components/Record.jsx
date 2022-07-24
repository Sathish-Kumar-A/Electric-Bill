import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecord } from '../api/api';
import toast from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEBData } from '../Context';

export const Record = ({ billDate, paidDate, unitConsumed, amount,id }) => {
    const navigate = useNavigate();
    const {refresh}=useEBData()
    const routeTo = (path) => {
        navigate({pathname:path,search:`bill=${id}`})
    }
    const deleteRecordComp = async () => { 
        const response = await deleteRecord(id);
        if (response.success) { 
            
            await refresh();
            toast.success("Record deleted");
        }
        else {
            toast.error("Unable to delete record");
        }
    }
  return (
      <tr className='border text-[14px] text-gray-600 hover:bg-primary'>
          <td className="pl-4 py-4 cursor-pointer"><AiFillEye className='text-green-600 w-[20px] h-[20px]' onClick={()=>routeTo("/bill")}/></td>
                                <td className="pl-4 py-4">{billDate}</td>
                                <td className="pl-4 py-4">{paidDate}</td>
                                <td className="pl-4 py-4">{unitConsumed}</td>
                                <td className="pl-4 py-4">{amount}</td>
                              <td className='pl-4 py-4'>
                                  <div className='flex justify-around'>
                  <TbEdit className='w-[20px] h-[20px] text-blue-600 cursor-pointer' onClick={()=>routeTo("/edit")} />
                                      <RiDeleteBin5Line className='w-[20px] h-[20px] text-red-700 cursor-pointer' onClick={deleteRecordComp}/>
                                  </div>
                                </td>
    </tr>
  )
}

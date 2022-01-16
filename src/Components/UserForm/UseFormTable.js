import React from 'react';

const UseFormTable = ({ data, handleDeletUser }) => {
    const { _id, username, mobile, email, address } = data;
    return (
        <>
            <tr className='bg-gray-100 h-10 shadow-lg border-none rounded-lg'>
                <td className="pl-3 rounded-lg border-b border-slate-200 ">{username}</td>
                <td className="pl-3  border-b border-slate-200 ">{mobile}</td>
                <td className="pl-3  border-b border-slate-200 ">{email}</td>
                <td className="pl-3  border-b border-slate-200 ">{address}</td>
                <td className="pl-3 border-b border-slate-200 "><button onClick={() => handleDeletUser(_id)} className='text-blue-600 text-center ml-2'><i title='DELET' className="fas fa-trash-alt" ></i></button></td>
            </tr>
        </>
    );
};

export default UseFormTable;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../Auth/AuthContext';
import UseFormTable from './UseFormTable';

const UserForm = () => {
    const [data, setData] = useState([])
    const { logout } = useAuth();

    // submit userDetails
    const handleSubmit = (e) => {
        e.preventDefault();
        if (/^[a-zA-Z0-9]+$/.test(e.target.username.value) && /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(e.target.mobile.value)) {
            axios.post(`https://damp-shore-51847.herokuapp.com/api/userDetails`, {
                username: e.target.username.value,
                mobile: e.target.mobile.value,
                email: e.target.email.value,
                address: e.target.address.value
            })
                .then((res) => {
                    e.target.reset();

                    swal({ title: "User added successfully!", icon: "success" });
                })
                .catch(err => swal({ title: "username or mobile number or email already exist !", icon: "warning" }));


        }

        else {
            if (!/^[a-zA-Z0-9]+$/.test(e.target.username.value)) {
                swal({ title: "UserName should No spaces or Only alphanumeric characters", icon: "warning" });
            }
            if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(e.target.mobile.value)) {
                swal({
                    title: "Mobile-Number Should be Only 10 numbers",
                    icon: "warning"
                });
            }
        }
    }

    // get userDetails
    useEffect(() => {
        axios.get(`https://damp-shore-51847.herokuapp.com/api/userDetails`).then((res) => {
            setData(res.data);
        })
    }, [data]);

    // delet user data

    const handleDeletUser = (id) => {
        swal({
            title: "Are you sure for Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://damp-shore-51847.herokuapp.com/api/userDetails/${id}`).then((res) => {
                        const message = res.data.message;
                        swal({ title: `${message}`, icon: "success" });
                    })
                }
            });
    }

    return (
        <div className='w-full'>
            <div className='w-full h-14 px-10 flex justify-between items-center bg-blue-600'>
                <div>
                    <h1 className='text-white font-medium'>Nemesis Consultants LLP</h1>
                </div>
                <div><button className='border hover:bg-white text-white hover:text-black py-1 px-3 rounded' onClick={logout}>LogOut</button></div>
            </div>

            <div className='flex m-5 flex-col lg:flex-row'>
                <div className='w-full lg:w-1/2 mx-auto flex justify-center items-start'>
                    <form className='m-5 w-full' onSubmit={e => handleSubmit(e)}>
                        <h1 className='text-center text-2xl font-bold my-5'>Add User Details</h1>
                        <input className='w-full my-2 active:border-2 active:border-gray-400 focus:border-gray-400 bg-white text-lg border-2 rounded-lg px-5 py-2' type="text" name="username" placeholder='Username' required /> <br />
                        <input className='w-full my-2 active:border-2 active:border-gray-400 focus:border-gray-400 bg-white text-lg border-2 rounded-lg px-5 py-2' type="number" name="mobile" maxLength={10} id="" placeholder='Mobile Number' required /> <br />
                        <input className='w-full my-2 active:border-2 active:border-gray-400 focus:border-gray-400 bg-white text-lg border-2 rounded-lg px-5 py-2' type="email" name="email" id="" placeholder='Email' required /> <br />
                        <input className='w-full my-2 active:border-2 active:border-gray-400 focus:border-gray-400 bg-white text-lg border-2 rounded-lg px-5 py-2' type="text" name="address" placeholder='Address' required /> <br />
                        <input className='text-white py-2 px-4 bg-blue-600 w-full rounded mt-5 cursor-pointer hover:bg-blue-800' type="submit" value="Submit" />
                    </form>
                </div>
                <div className='lg:w-1/2 py-12'>
                    <h1 className='font-bold text-2xl text-center'>User List</h1>
                    <table className="overflow-x-scroll w-full m-5">
                        <thead className='shadow-lg'>
                            <tr className='bg-blue-600 h-10 text-white py-5 z-10'>
                                <th className=" px-3 text-left border-slate-100 ">UserName</th>
                                <th className=" px-3 text-left border-slate-100 ">Mobile Number</th>
                                <th className=" px-3 text-left border-slate-100 ">Email</th>
                                <th className=" px-3 text-left border-slate-100 ">Address</th>
                                <th className=" px-3 text-left border-slate-100 ">Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100'>
                            {
                                data.map(res =>
                                    <UseFormTable
                                        key={res._id}
                                        data={res}
                                        handleDeletUser={handleDeletUser}
                                    ></UseFormTable>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
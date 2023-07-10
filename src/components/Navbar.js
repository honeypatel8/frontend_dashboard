import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthConsumer } from '../contextApi/store'
import { logoutUser } from '../apis/logoutUser';

const Navbar = () => {
    const { activeUser, dispatch } = AuthConsumer();

    const navigate = useNavigate();

    const Logout = async () => {
        try {
            const result = await logoutUser();
            console.log(result.data.message);
            dispatch({ type: 'logout' })
            navigate('/signin')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-between items-center p-2 py-3 bg-gray-800 fixed w-full top-0  '>
            <div className=' flex flex-1 space-x-4 text-gray-400 '>
                {
                    !!activeUser.user && (
                        <>
                            <NavLink className='px-3 py-1 rounded-md text-gray-400' style={({ isActive }) => { return { color: isActive ? 'white' : 'rgb(156 163 175 / 1)', background: isActive ? 'black' : ' rgb(31 41 55 / 1' } }} to='/'>Home</NavLink>
                            <NavLink className='px-3 py-1 rounded-md text-gray-400' style={({ isActive }) => { return { color: isActive ? 'white' : 'rgb(156 163 175 / 1)', background: isActive ? 'black' : ' rgb(31 41 55 / 1' } }} to="/stats">Stats</NavLink>
                        </>
                    )
                }
                {
                    !activeUser.user && (
                        <>
                            <NavLink className='px-3 py-1 rounded-md text-gray-400' style={({ isActive }) => { return { color: isActive ? 'white' : 'rgb(156 163 175 / 1)', background: isActive ? 'black' : ' rgb(31 41 55 / 1' } }} to="/signin">Login</NavLink>
                            <NavLink className='px-3 py-1 rounded-md text-gray-400' style={({ isActive }) => { return { color: isActive ? 'white' : 'rgb(156 163 175 / 1)', background: isActive ? 'black' : ' rgb(31 41 55 / 1' } }} to="/signup">Register</NavLink>
                        </>
                    )
                }
            </div>
            <div>
                {

                    !!activeUser.user && (
                        <div className='flex'>
                            <button onClick={Logout} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Log Out
                            </button>
                            <NavLink className='px-3 py-1 rounded-md text-gray-400' style={({ isActive }) => { return { color: isActive ? 'white' : 'rgb(156 163 175 / 1)', background: isActive ? 'black' : ' rgb(31 41 55 / 1' } }} to="/profile">Profile</NavLink>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
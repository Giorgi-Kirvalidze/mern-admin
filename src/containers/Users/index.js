import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI'


const Users = () => {
    const users = useSelector(state => state.user.users)
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        number: ''
    })

    useEffect(() => {
        console.log('mounted')
    })
    function refreshPage() {
        window.location.reload(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(formData.id, formData))
        setShow(show => !show)
        //refreshPage()
    }


    const renderUserData = () => {
        return (
            <form className="usersForm" onSubmit={handleSubmit}>
                < Input
                    className="usersForm__input"
                    type="text"
                    label="FirstName"
                    placeholder="Enter user name"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                />
                < Input
                    className="usersForm__input"
                    type="text"
                    label="LastName"
                    placeholder="Enter user lastname"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
                < Input
                    className="usersForm__input"
                    type="email"
                    label="Email"
                    placeholder="Enter user email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                < Input
                    className="usersForm__input"
                    type="text"
                    label="Role"
                    placeholder="Enter user role"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
                < Input
                    className="usersForm__input"
                    type="password"
                    label="Password"
                    placeholder="Enter your name"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                < Input
                    className="usersForm__input"
                    type="text"
                    label="Number"
                    placeholder="Enter user number"
                    value={formData.number}
                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                />
                <button className="btn" type="submit">Update</button>
            </form>
        )
    }


    const handleClick = (id) => {
        const user = users.find(user => user._id === id)
        setShow(show => !show)
        if (show === false) {
            setFormData({
                ...formData,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                email: user.email,
                role: user.role,
                number: user.number
            })
        }
    }

    return (
        <div className="home">
            <Layout sidebar>
                <h1>Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                            <th>role</th>
                            <th>password</th>
                            <th>contuct</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.length > 0 ?
                                users.map(user =>
                                    <tr key={user._id} >
                                        <td>{user._id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.password}</td>
                                        <td>{user.number}</td>
                                        <td>
                                            <button className="btn" onClick={() => handleClick(user._id)} >Edit</button>
                                        </td>
                                    </tr >
                                ) : null
                        }
                    </tbody>
                </table>
                {
                    show ? renderUserData() : null
                }
            </Layout>
        </div >
    )
}

export default Users

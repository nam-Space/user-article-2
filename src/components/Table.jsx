import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const Table = () => {
    const [users, setUsers] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getInfo = async () => {
            const usersData = await axios.get('http://localhost:3001/users')
            const articleData = await axios.get('http://localhost:3001/article')

            setUsers(usersData.data)
            setArticles(articleData.data)
        }

        getInfo()
        
        return () => {

        }
    }, [])

    return (
        <div className="wrapper">
            <h1>Users</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Article</th>
                        <th>Numbers</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        let cnt = 0
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                {articles.map(article => {
                                    if (article.user_id === user.id) cnt++
                                })}
                                <td>{cnt}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
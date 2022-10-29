import React, { useEffect, useState } from "react"
import secrets from "../configs/secrets.json"
import JSONPretty from 'react-json-pretty';
import { baseURL } from "../configs/urls";


console.log("hello "+baseURL)

const RecentOrders = () => {
  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch( baseURL+"recent_orders", {
      method: 'GET',
      headers: {Authorization: 'Bearer '+secrets.token }
    }).then(response => {
        return response.json()  
      })
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  var JSONPrettyMon = require('react-json-pretty/dist/monikai');
  return (
    <JSONPretty data={users} theme={JSONPrettyMon}></JSONPretty>
  )
}

export default RecentOrders
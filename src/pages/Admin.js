import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { baseURL } from '../configs/urls';
import secrets from "../configs/secrets.json";
import React, { useEffect, useState } from "react"



function get_shirts_data(unprocessed_data){
    
  var processed_data =[]
  
  var size_stats = unprocessed_data.size_stats
  for (let key in size_stats) {
     if (size_stats.hasOwnProperty(key) && key!='jean') {
       processed_data.push({ ...{"name": key}, ...size_stats[key] }) 
     }
   }
   
   return processed_data;
  
  }
  
  
  function get_jeans_data(unprocessed_data){
      
  var processed_data =[]
  
  var size_stats = unprocessed_data.size_stats
  for (let key in size_stats) {
     if (size_stats.hasOwnProperty(key) && key=='jean') {
       processed_data.push({ ...{"name": key}, ...size_stats[key] }) 
     }
   }
   
   return processed_data;
  
  }


function get_price_data(unprocessed_data){
    var processed_data = []
    var price_stats = unprocessed_data.price_stats
    for (let key in price_stats) {
    if (price_stats.hasOwnProperty(key)) {
     processed_data.push({ "name": key, "amount":price_stats[key]}) 
    }
 }
    return processed_data;
}

  
export default function Admin() {


  const [textboxValue, settextboxValue] = useState('');

  const [users, setUsers] = useState([])


  const handletextChange = event => {
    settextboxValue(event.target.value);
    console.log('value is:', event.target.value);
  };

  const fetchData = () => {
    fetch( baseURL+"stats", {
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


  const shirts_data  = get_shirts_data(users)
  const jean_Data = get_jeans_data(users)
  const price_data = get_price_data(users)


  const handleClick = async () => {
    try {
      const response = await fetch( baseURL+"stats?from_date="+textboxValue, {
        method: 'GET',
        headers: {Authorization: 'Bearer '+secrets.token }
      });
      const result = await response.json();
      setUsers(result);
      console.log(result)
    } catch (err) {
      
    } finally {
      
    }
    
    console.log("button clieckd")
  
  }

  const handleChange = event => {
    settextboxValue(event.target.value);
    console.log('value is:', event.target.value);
  };

  
  
    return (
      <div className='question'>
        <div className='question-container'>
        <h1>charts</h1>
        <label>From Date YYYY-MM-DD </label>
        <input type="text" onChange={handletextChange} ></input>
        <button onClick={handleClick}>Filter again</button>
        <ResponsiveContainer width="200%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={shirts_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="S" fill="#8884d8" />
          <Bar dataKey="M" fill="#82ca9d" />
          <Bar dataKey="L" fill="#34eb89" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="200%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={jean_Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="30" fill="#8884d8" />
          <Bar dataKey="32" fill="#82ca9d" />
          <Bar dataKey="34" fill="#34eb89" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="200%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={price_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#3366ff" />
        </BarChart>
      </ResponsiveContainer>


      </div>
      </div>
    );
 
}

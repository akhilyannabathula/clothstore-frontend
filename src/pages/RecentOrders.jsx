import React, { useEffect, useState } from "react"
import secrets from "../configs/secrets.json"
import JSONPretty from 'react-json-pretty';
import { baseURL } from "../configs/urls";
import { JsonToTable } from "react-json-to-table";


console.log("hello "+baseURL)

const RecentOrders = () => {
  const [users, setUsers] = useState([])
  const [textboxValue, settextboxValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');

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


  const onDelete = async () => {

    console.log("button clieckd")

    if(passwordValue ==='secret'){

    
      try {

        alert("please confirm to delete")
        console.log("deleteing an item")

        const deleteResponse = await fetch( baseURL+`item/${textboxValue}`, {
          method: 'DELETE',
          headers: {Authorization: 'Bearer '+secrets.token }
        });

        if (!deleteResponse.ok) {
          alert("unable to delete please check ITEM ID");
        }
        else{ alert("deleted succesfully")}

        const response = await fetch( baseURL+"recent_orders", {
          method: 'GET',
          headers: {Authorization: 'Bearer '+secrets.token }
        });
        const result = await response.json();
        setUsers(result);
        console.log(result)
      } catch (err) {
      
      } finally {
    
        setpasswordValue('')
      }
    }

    else{ 
      alert("wrong password")
      console.log("wrong password") 
    }
    
  
  }

  const handletextChange = event => {
    settextboxValue(event.target.value);
    console.log('value is:', event.target.value);
  };

    const handlePasswordtextChange = event => {
    setpasswordValue(event.target.value);
    console.log('password is:', event.target.value);
  };

  return (
    <div className="randomID">


    <label> Item Id</label>
    <input type="text" onChange={handletextChange} className="inputText"></input>
    <label> Password </label>
    <input type="password" onChange={handlePasswordtextChange} className="inputText" value={passwordValue}></input>
    <button onClick={onDelete}>Delete</button>
    <JsonToTable json={users} />
    </div>
  )
}

export default RecentOrders
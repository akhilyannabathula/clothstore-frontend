import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, {useState , useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleCheck, faPen, faTrashCan 
} from '@fortawesome/free-solid-svg-icons'

import '../homepage.css'

import { baseURL } from '../configs/urls';
import secrets from "../configs/secrets.json"

function Home() {

  // Tasks (items List) State
  const [items, setItems] = useState([]);

  // Temp State
  const [updateData, setUpdateData] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [size, setSize] = useState('S');
  const [itemType, setItemType] = useState('tshirt');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const [source, setSource] = useState('banglore');
  const [password, setPassword] = useState('');
  const [appStatus, setappStatus] = useState('Down');



  const invokeBackend = () => {
    fetch( baseURL+"health", {
      method: 'GET',
      headers: {Authorization: 'Bearer '+secrets.token }
    }).then(response => {
        return response.json()  
      })
      .then(data => {
        console.log(data)
        setappStatus(data.status)
      })
  }
  
  useEffect(() => {
    invokeBackend()
  }, [])
  

  const placeOrder = async () =>{

    if(password == 'secret'){

        var post_data = { customer_name : name, phone_number : mobileNumber, items : items }
        var final_data = JSON.stringify(post_data)
        console.log(final_data)


        
        const deleteResponse = await fetch( baseURL+'orders', {
          method: 'POST',
          headers: {Authorization: 'Bearer '+secrets.token, 'Content-Type': 'application/json'},
          body: final_data
        });

        if (!deleteResponse.ok) {
          alert("!failed try again");
        }
        else{ alert("placed succesfully")}

      }

      else{alert("wrong password")}

  }


  function resetList(){
    setItems([])
  }


  // Add task 
  ////////////////////////////////////////// 
  const addNewItem = () => {
      let num = items.length + 1; 
      let newEntry = {id: num, status: false, customer_name:name, phone_number: mobileNumber, item_type:itemType, size: size, description:description, sold_price: price, source:source}
      setItems([...items, newEntry]);    
  }

  // Delete task 
  ////////////////////////////////////////// 
  const deleteItem = (id) => {
    let newItems = items.filter((task) => task.id !== id);
    setItems(newItems);
  }



  // Change task for update
  ////////////////////////////////////////// 
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }


  
  return (
    <div className="container App">
      <h5>App status: {appStatus}</h5>
      <br /><br />

      <h2>Place Order</h2>
      <br/><br />
      
          <div>
            <div >
​
          <div>
            <label>Name</label>
              <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
          </div>

            <div>
            <label>PhoneNumber</label>
              <input 
                value={mobileNumber} 
                onChange={e => setMobileNumber(e.target.value)} 
              />
            </div>


            <div>
            <label>Item Type</label>
            <select value={itemType} onChange={e => setItemType(e.target.value)} >
                <option value="tshirt">Tshirt</option>
                <option value="jean">Jean</option>
                <option value="shirt">shirt</option>
                <option value="trouser">trouser</option>
                <option value="short">short</option>
                <option value="hoodie">hoodie</option>
                <option value="other">other</option>
              </select>

            </div>
            



            <div>
              <label>Size</label>
              
              <select value={size} onChange={e => setSize(e.target.value)} >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="34">34</option>
                <option value="36">36</option>
                <option value="38">38</option>
                <option value="other">other</option>
              </select>
            </div>


            <div>
              <label>price</label>
              <input 
                value={price}
                type='number' 
                onChange={e => setPrice(e.target.value)} 
              />
            </div>

            <div>
            <label>Source</label>
            <select value={size} onChange={e => setSource(e.target.value)} >
                <option value="banglore">banglore</option>
                <option value="myntra">myntra</option>
                <option value="ajio">ajio</option>
                <option value="online">online</option>
                <option value="38">38</option>
                <option value="other">other</option>
              </select>
            </div>

            <div>
              <label>description</label>
              <input 
                value={description} 
                onChange={e => setdescription(e.target.value)} 
              />
            </div>

            <div>
              <label>Admin Password</label>
              <input 
                value={password} 
                type='password'
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            </div>

            <div>
              <br></br>
              <button 
                className="btn btn-lg btn-success" 
                onClick={addNewItem}
              >Add Item</button>
            </div>

            <div>
              <br></br>
              <button 
                className="btn btn-lg btn-success" 
                onClick={placeOrder}
              >Place Order</button>
            </div>

            <div>
              <br></br>
              <button 
                className="btn btn-lg btn-success" 
                onClick={resetList}
              >Reset List</button>
            </div>


          </div>
          <br />
        
      


      {/* If there are no to dos in state, display a message   */}
      {items && items.length ? '' : 'No Items..'}
      
      {/* Show items as list   */}
      {items && items
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map( (item, index) => {
        return(
          <React.Fragment key={item.id}>
          
            <div className="col taskBg">
              
              <div 
                // if task status is true, add class to this div named as done
                className={ item.status ? 'done' : '' }
              >
                {/* Show number of task */}
                <span className="taskNumber">{index + 1}</span> 
                <span className="taskText">{item.customer_name}</span>
                <span className="taskText">{item.phone_number}</span>
                <span className="taskText">{item.item_type}</span>
                <span className="taskText">{item.size}</span>
                <span className="taskText">{item.sold_price}</span>
                <span className="taskText">{item.source}</span>
                <span className="taskText">{item.description}</span>

              </div>

              <div className="iconsWrap">
                <span 
                  onClick={() => deleteItem(item.id)}
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>

            </div>
                     
        </React.Fragment>
        );
      })}
    </div>
  );
}
export default Home;

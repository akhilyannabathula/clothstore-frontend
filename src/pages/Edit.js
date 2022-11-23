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
import priceList from "../configs/prices.json"

function Edit() {



  // Temp State
  const [updateData, setUpdateData] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [size, setSize] = useState('S');
  const [itemType, setItemType] = useState('tshirt');
  const [price, setPrice] = useState(0);
  const [actualPrice, setactualPrice] = useState(475);
  const [brand,setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setdescription] = useState('');
  const [source, setSource] = useState('banglore');
  const [password, setPassword] = useState('');
  const [appStatus, setappStatus] = useState('Down');
  const [itemId, setItemId] = useState('');
  const [orderId, setOrderId] = useState('');


  const handleBrandChange = event => {
    var choice = event.target.value;
    setBrand(choice)
    console.log('value is:', event.target.value);
    console.log("relevent actual price is",  priceList[choice])
    setactualPrice(priceList[choice])

  };

  const handleItemIdChange = event => {
    setItemId(event.target.value);
    console.log('Item id is', event.target.value);
  };

  const getItem = async () => {

    try {
        const response = await fetch( baseURL+"item/"+itemId, {
          method: 'GET',
          headers: {Authorization: 'Bearer '+secrets.token }
        });
        const result = await response.json();
        console.log(result)
        setName(result.order.customer_name)
        setMobileNumber(result.order.phone_number)
        setItemType(result.item_type)
        setBrand(result.brand)
        setSize(result.size)
        setPrice(result.sold_price)
        setdescription(result.description)
        setSource(result.source)
        setOrderId(result.order_id)
        setactualPrice(result.actual_price) 
      } 
      catch (err) {} 
      finally {}

  }


  const updateItem = async () =>{

    if(password == 'secret'){

        var post_data = { id : itemId, item_type : itemType, description : description, order_id: orderId, sold_price:price, actual_price: priceList[brand], brand: brand, size : size, source:source}
        var final_data = JSON.stringify(post_data)
        console.log(final_data)


        
        const deleteResponse = await fetch( baseURL+"item", {
          method: 'PUT',
          headers: {Authorization: 'Bearer '+secrets.token, 'Content-Type': 'application/json'},
          body: final_data
        });

        if (!deleteResponse.ok) {alert("!failed try again");}
        else{ alert("placed succesfully")}
    }

      else{alert("wrong password")}

  }



  
  return (
    <div className="container App">

      <h2>Update Item</h2>
      <br/><br />
      
        <div>
        <div >

            <div>
                <label>Item Id</label>
                <input type="text" onChange={handleItemIdChange} value={itemId}></input>
                <button onClick={getItem}>Search</button>
            </div>
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
                <option value="collar-tshirt">Collar-Tshirt</option>
                <option value="jean">Jean</option>
                <option value="shirt">shirt</option>
                <option value="trouser">trouser</option>
                <option value="short">short</option>
                <option value="hoodie">hoodie</option>
                <option value="sweatshirt">sweatshirt</option>
                <option value="underwear">underwear</option>
                <option value="other">other</option>
              </select>

            </div>
            
            <div>
            <label>Brand</label>
            <select value={brand} onChange={handleBrandChange} >
                <option value="snitch">snitch</option>
                <option value="buffalow">buffalow</option>
                <option value="ms">M&S</option>
                <option value="lee-shirt">lee,levis,wrangler shirt</option>
                <option value="spykar-jean">Spykar jean</option>
                <option value="peterengland-jean">Peterengland jean</option>
                <option value="max-jean">Max jean</option>
                <option value="roadster-jean">Roadster jean</option>
                <option value="uspolo-underwear">USPolo underwear</option>
                <option value="jj-sweatshirt">J&J sweatshirt</option>
                <option value="jj-tshirt">J&J tshirt</option>
                <option value="jj-Ctshirt">J&J Collar tshirt</option>
                <option value="UCB-Ctshirt">UCB Collar tshirt</option>
                <option value="hoodie">WC hoodie</option>
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
            <select value={source} onChange={e => setSource(e.target.value)} >
                <option value="banglore">banglore</option>
                <option value="myntra">myntra</option>
                <option value="ajio">ajio</option>
                <option value="online">online</option>
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
                onClick={updateItem}
              >Update Item</button>
            </div>

          </div>

    </div>
  );
}
export default Edit;

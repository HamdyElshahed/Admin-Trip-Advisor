import 'firebase/firestore';
import 'firebase/auth';
import React,{useState , useEffect} from 'react';
import {db } from '../config/firebase'
import {collection , getDocs} from "firebase/firestore"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {addDoc,updatehotel,deleteDoc,  doc} from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




export default function Hotels() {

    const [hotels , setHotels]=useState([]);
    const hotelsCollectionRef =  collection(db ,"hotels" )
   const history = useHistory();




    const deleteHotel = async (id) => {
      const hotelsDoc = doc(db, "hotels", id);
      await deleteDoc(hotelsDoc);
    };
  
   const updatehotel=(id)=>{
    history.push(`/HotelsUpdate/${id}`)
    

   }

   const addHotel=()=>{
     history.push(`/addHotels`)
   }

  useEffect  (()=>{
  const getHotels = async()=>{
    const data = await getDocs(hotelsCollectionRef);
    setHotels(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  // console.log(data.docs);
  }
  getHotels()
  },[])
  
  
  
  
  
  return <div className="App row m-2">
  {
    <>
    <Button onClick={addHotel} variant="primary  p-2 m-2">add hotel</Button>
    {hotels.map((hotel)=>{
      return (
        <>
         {/*   */}
        
        <Card className='col-4 m-2' style={{ width: '22rem', display:"float" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body >
          <Card.Title> <h3 style={{color :"red" , fontSize:"22px"}}>{hotel.name}</h3></Card.Title>
          <Card.Text>
        <p style={{color :"blue" , fontSize:"14px"}}>address: {hotel.location?.address}</p>  <br/>
        <p style={{color :"blue" , fontSize:"14px"}}>price:{hotel.price}</p>  
          </Card.Text>
          <Button variant="dark p-2 m-2"  onClick={() => {
                  deleteHotel(hotel.id);
                }}>Delete</Button> 
          <Button variant="dark p-2"  onClick={() => {
                updatehotel(hotel.id);
              }} > Edit</Button>
        </Card.Body>
      </Card>
        </>
      )
  
    })
  }
  </>
  }
  
  </div>
  // 
  }


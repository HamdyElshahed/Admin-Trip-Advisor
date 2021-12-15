import React, { useEffect, useState } from 'react'
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getTempRestaurantById } from '../../store/actions/Restaurant';

import {
    app
} from "../../API/FirebaseConfig"
import {
    getFirestore,
    collection,
    getDocs,
    where,
    query,
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';


const db = getFirestore(app);
/**
 * @param id the id of the temporary stored restaurants in users collection 
 * @param uid the id of the user that have posts needs to be reviesed
 */
export const RestaurantCard = ({ id, uid }) => {

    const restaurants = useSelector(state => state.restaurant)
    const [showModal, setshowModal] = useState(false);
    const [submit, setSubmit] = useState(false)

    const [deletePostItem, setDeletePostItem] = useState(false)
    var [inputField , setInputField] = useState(
        {
            is_claimed: false,
            id: "",
            categories: [
                inputFieldCateg
            ],
            phone: 0,
            location: inputFieldLoc,
            url: "",
            name: ""
        }
    )
    var [inputFieldCateg , setInputFieldCateg] = useState()

    var [inputFieldLoc , setInputFieldLoc] = useState({
        
        city: "",
        state: "",
        country: "",
        address1: ""
    

})
    const inputsHandler = (e) =>{
        setInputField({[e.target.name]: e.target.value} )
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTempRestaurantById(id, uid))
    }, [])

    useEffect(() => {
        if(submit){
            console.log(inputField)
            setDoc(doc(db,`restaurant/${id}`),inputField).then(val=>{
                console.log(val)
                setshowModal(false)
            }).catch(err=>{
                console.log(err)
            })
        }
    }, [submit])

    const deletePost=()=>{
        deleteDoc(doc(db,`Users/${uid}/posts/${id}`));
        updateDoc(doc(db,`Users/${uid}`),{posts:[]})
        setDeletePostItem(true)

    }

    console.log(restaurants)
    return (
        <div>
            {restaurants?.map(val => {
              return  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                 <a className='mb-2 w-100 pe-3' onClick={() => {setshowModal(true) ;setInputField(val);setInputFieldLoc(val.location);setInputFieldCateg(val.categories[0])}}>
                    <Card  key={val.id} >
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{}}>{val?.name}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </a> 
                    <button className='btn btn-primary col-1' onClick={()=>{deletePost()}}>Delete</button>
                </div>
            })}

            <Modal
                size="lg"
                show={showModal}
                onHide={() => setshowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name='categories' onChange={(e)=>{setInputField( {[e.target.name]: e.target.value})}}  value={inputField?.categories} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <div className='text-center'>Location</div>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name='address1'  onChange={(e)=>{setInputFieldLoc( {[e.target.name]: e.target.value})}} value={inputFieldLoc?.address1} />
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name='city' onChange={(e)=>{setInputFieldLoc( {[e.target.name]: e.target.value})}}  value={inputFieldLoc?.city} />
                            <Form.Label>state</Form.Label>
                            <Form.Control type="text" name='state' onChange={(e)=>{setInputFieldLoc( {[e.target.name]: e.target.value})}}  value={inputFieldLoc?.state} />
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name='country' onChange={(e)=>{setInputFieldLoc( {[e.target.name]: e.target.value})}}  value={inputFieldLoc?.country} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='name' onChange={inputsHandler}  value={inputField?.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name='phone' onChange={inputsHandler}  value={inputField?.phone} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Url</Form.Label>
                            <Form.Control type="text" name='url' onChange={inputsHandler}  value={inputField?.url} />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" onClick={(e)=>{
                            e.preventDefault();
                            setSubmit(true)}}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

import { getDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useState, useEffect, useHistory } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default function HotelsUpadate() {
  const params = useParams();
  const [hotel, setHotel] = useState({});
  const [Hotel, NewHotel] = useState({});
  const [id, setid] = useState(params.id);
  const [location, setLocation] = useState({});
  //  console.log(id);

  useEffect(() => {
    const getHotel = async () => {
      if (id) {
        const hotelDocSnapshot = await getDoc(doc(db, "hotels", id));
        setHotel(hotelDocSnapshot.data());
        setLocation(hotel.location);
        console.log(location);
      }
    };

    getHotel();
  }, []);

  const addHotel = async () => {
    await addDoc(collection(db, "hotels"), hotel);
    setHotel({
      name: "",
      price: "",
      location: { address: "" },
      location: "",
      phone_number: "",
      image_url: "",
      rate: "",
    });
  };

  const updatehotel = async (id, e) => {
    //  e.preventDefault()'
    console.log(id);
    const hotelDocSnapshot = await doc(db, "hotels", id);
    updateDoc(hotelDocSnapshot, hotel);
    console.log(hotel);
  };

  const handelInputChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <Form>
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>name</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="text"
              name="name"
              placeholder="name"
              value={hotel.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>rate</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="number"
              name="rate"
              placeholder="rate"
              value={hotel.rate}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            {/* We'll never share your email with anyone else. */}
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>location</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="text"
              placeholder=""
              name="location"
              value={
                hotel.location?.address
                  ? hotel.location?.address
                  : hotel.location
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>price</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="number"
              placeholder=""
              name="price"
              value={hotel.price}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>phone-number</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="number"
              placeholder=""
              name="phone_number"
              value={hotel.phone_number}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>image</Form.Label>
            <Form.Control
              onChange={(e) => handelInputChange(e)}
              type="text"
              placeholder=""
              name="image_url"
              value={hotel.image_url}
            />
          </Form.Group>
          {id && (
            <Button
              onClick={(e) => {
                updatehotel(id, e);
              }}
              variant="primary"
              type="button"
            >
              Edit
            </Button>
          )}

          {!id && (
            <Button onClick={addHotel} variant="primary" type="button">
              add
            </Button>
          )}
        </>
      </Form>
    </div>
  );
}

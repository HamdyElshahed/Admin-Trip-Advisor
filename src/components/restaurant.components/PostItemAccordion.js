import React from "react";
import { Accordion, Image } from "react-bootstrap";
import {RestaurantCard} from "../restaurant.components/RestaurantCard"
export const PostItemAccordion = ({user}) => {

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
              <Image  src={user.photoURL} style={{width:'40px',height:'40px',borderRadius:'50%'}}/>
              <span className="mx-2">{user.displayName}</span>
              <span className="mx-2">{user.posts.length}<span className="ps-2">posts</span></span>
               
              </Accordion.Header>
          <Accordion.Body>
              {user.posts.map(val=>{
                  return <RestaurantCard key={val.id} id={val.id} uid={user.uid}/>
              })}
            <div></div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

import * as React from 'react';
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Dashboard from '../pages/dashboard';
import NavBar from './navbar';
import Users from '../pages/users';
import Restaurant from '../pages/Restaurant';


export default function SideBar(){

    return (
        <Container fluid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
        <Row>
          <Col sm={2} className="pt-3" >
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="dashboard">                   
                    Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                   <Nav.Link eventKey="users">
                     Users
                   </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="hotels">Hotels</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="restaurants">Restaurants</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vacations">Vacations</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
          <NavBar />
            <Tab.Content>
              <Tab.Pane eventKey="dashboard" >
                  <Dashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                  <Users />
              </Tab.Pane>
              <Tab.Pane eventKey="hotels">
              </Tab.Pane>
              <Tab.Pane eventKey="restaurants">
                <Restaurant/>
              </Tab.Pane> 
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
        </Container>
    );
};
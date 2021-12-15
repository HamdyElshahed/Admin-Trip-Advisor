// @flow
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Dropdown,
  Badge
} from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { app, db } from "../config/firebase";

export default function Users() {
  const [registerauth, setregisterauth] = useState(clear());
  let [Users, getUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuth(app);

  useEffect(() => {
    setdata();
  },[]);
  async function setdata() {
    let arr = [];
    getUsers(arr);
    const unsub = await onSnapshot(collection(db, "Users"), (doc) => {
      Users = [];
      doc.forEach((d) => {
        Users.push(d.data());
      });
      getUsers(Users);
    });
  }

  function editUser(id) {
    setregisterauth(clear());
    const unsub = onSnapshot(doc(db, "Users", id), (doc) => {
      console.log("Current data: ", doc.data());
      setregisterauth({
        ...registerauth,
        id: doc.data().uid,
        username: doc.data().displayName,
        email: doc.data().email,
        phone: doc.data().phoneNumber,
        isAdmin: doc.data().isAdmin,
      });
    });
  }
  async function deleteUser(id) {
    await deleteDoc(doc(db, "Users", id));
  }
  function clear() {
    return {
      id: "",
      username: "",
      usernamevalid: "",
      email: "",
      emailvalid: true,
      emailtext: "",
      phone: "",
      phonevalid: true,
      phonetext: "",
      password: "",
      passwordvalid: true,
      passwordtext: "",
      confirmpassword: "",
      confirmpasswordvalid: "",
      isAdmin: false,
    };
  }
  function handle(e) {
    const regusername = /^\s*\S+\s*$/;
    const regemail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regphone = /^01[0-2,5]{1}[0-9]{8}$/;
    const regpassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    switch (e.target.name) {
      case "name":
        setregisterauth({
          ...registerauth,
          namevalid: e.target.value.length === 0 ? "name is require" : null,
          name: e.target.value,
        });
        break;
      case "username":
        setregisterauth({
          ...registerauth,
          username: e.target.value,
          usernamevalid:
            e.target.value.length === 0 || !regusername.test(e.target.value)
              ? "username is require and nospaces"
              : null,
        });
        break;
      case "email":
        setregisterauth({
          ...registerauth,
          email: e.target.value,
          emailvalid: regemail.test(registerauth.email) ? true : false,
          emailtext: registerauth.emailvalid ? "" : "email input require",
          disable: !(registerauth.emailvalid && registerauth.passwordvalid),
        });
        console.log(
          `email :  ${registerauth.email} password : ${registerauth.password}`
        );
        break;
      case "phoneNumber":
        setregisterauth({
          ...registerauth,
          phone: e.target.value,
          phonevalid: regphone.test(e.target.value) ? true : false,
          phonetext: registerauth.emailvalid
            ? ""
            : "enter numeric value contain 11 number",
          disable: !(registerauth.emailvalid && registerauth.passwordvalid),
        });
        break;
      case "password":
        setregisterauth({
          ...registerauth,
          password: e.target.value,
          passwordvalid: regpassword.test(e.target.value) ? true : false,
          passwordtext: registerauth.passwordvalid
            ? ""
            : "password must contain at least one lowercase character , uppercase characte , numeric value ,(?=.*[-+_!@#$%^&*., ?]) represents at least one special character. ",
          disable: !(registerauth.emailvalid && registerauth.passwordvalid),
        });
        console.log(
          `email :  ${registerauth.email} password : ${registerauth.password}`
        );
        break;
      case "confirmpassword":
        setregisterauth({
          ...registerauth,
          confirmpassword: e.target.value,
          confirmpasswordvalid:
            registerauth.password !== e.target.value
              ? "confirm password must be a same password"
              : null,
        });
        break;
      default:
        break;
    }
    console.log(
      `email :  ${registerauth.email} password : ${registerauth.isAdmin}`
    );
  }
  async function SetUserDataRegister(user, username, phone, isAdmin, check) {
    let userdata;
    const setuserdata = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      phoneNumber: phone,
      emailVerified: user.emailVerified,
      isAdmin: isAdmin,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/iti-trip-advisor.appspot.com/o/home%2Fprofile.jpg?alt=media&token=6c056796-3c9d-4148-a1d8-95a6d410d405",
    };
    console.log(user);
    const userdataedit = {
      uid: user.uid,
      email: registerauth.email,
      displayName: username,
      phoneNumber: phone,
      isAdmin: isAdmin,
    };
    userdata = check ? { ...setuserdata } : { ...userdataedit };

    const adduser = await setDoc(doc(db, "Users", user.uid), userdata, {
      merge: true,
    });
    // const adduser = await addDoc(collection(db,'Users'),userdata);
  }

  async function submitAddUser(e, check) {
    e.preventDefault();
    if (registerauth.id === "" || registerauth.id === null) {
      createUserWithEmailAndPassword(
        auth,
        registerauth.email,
        registerauth.password
      )
        .then(async (userCredential) => {
          const user = await userCredential.user;
          await SetUserDataRegister(
            user,
            registerauth.username,
            registerauth.phone,
            registerauth.isAdmin,
            true
          );
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
      console.log(registerauth);
    } else {
      await SetUserDataRegister(
        { uid: registerauth.id },
        registerauth.username,
        registerauth.phone,
        registerauth.isAdmin,
        false
      );
    }
    setregisterauth(clear());
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users Table</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    All Users
                  </p>
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setregisterauth(clear());
                        handleShow();
                      }}
                    >
                      Add User
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row">
                          <div className="col-12 px-3">
                            <form className="col-8 m-auto py-4">
                              <div className=" mb-4">
                                <div className="htmlForm-group position-relative">
                                  <label
                                    htmlFor="userName"
                                    className="label-control"
                                  >
                                    User Name
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      registerauth.usernamevalid
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    placeholder="Your Name"
                                    id="username"
                                    name="username"
                                    value={registerauth.username}
                                    onChange={(e) => handle(e)}
                                  ></input>
                                  <small className="text-danger">
                                    {registerauth.usernamevalid}
                                  </small>
                                </div>
                              </div>
                              <div className=" mb-4">
                                <div className="htmlForm-group position-relative">
                                  <label
                                    htmlFor="email"
                                    className="label-control"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={registerauth.email}
                                    className={`form-control ${
                                      registerauth.emailvalid
                                        ? ""
                                        : "border-danger"
                                    }`}
                                    id="Email"
                                    name="email"
                                    placeholder="example@any.com"
                                    onChange={(e) => handle(e)}
                                  ></input>
                                  <small className="text-danger">
                                    {registerauth.emailtext}
                                  </small>
                                </div>
                              </div>
                              <div className=" mb-4">
                                <div className="htmlForm-group position-relative">
                                  <label
                                    htmlFor="phone"
                                    className="label-control"
                                  >
                                    Phone
                                  </label>
                                  <input
                                    type="phone"
                                    className={`form-control ${
                                      registerauth.phonevalid
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    name="phoneNumber"
                                    id="phone"
                                    placeholder="01000000000"
                                    value={registerauth.phone}
                                    onChange={(e) => handle(e)}
                                  ></input>
                                  <small className="text-danger">
                                    {registerauth.phonevalid}
                                  </small>
                                </div>
                              </div>
                              <div className=" mb-4">
                                <div className="htmlForm-group position-relative">
                                  <label
                                    htmlFor="password"
                                    className="label-control"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    className={`form-control ${
                                      registerauth.passwordvalid
                                        ? ""
                                        : "border-danger"
                                    }`}
                                    id="inputPassword"
                                    name="password"
                                    placeholder="**************"
                                    onChange={(e) => handle(e)}
                                  ></input>
                                  <small className="text-danger">
                                    {registerauth.passwordtext}
                                  </small>
                                </div>
                              </div>
                              <div className=" mb-4">
                                <div className="htmlForm-group  position-relative">
                                  <label
                                    htmlFor="reppassword"
                                    className="label-control"
                                  >
                                    Repeat Password
                                  </label>
                                  <input
                                    type="password"
                                    className={`form-control ${
                                      registerauth.confirmpasswordvalid
                                        ? "border-danger"
                                        : ""
                                    }`}
                                    id="confirmPassword"
                                    name="confirmpassword"
                                    placeholder="**************"
                                    onChange={(e) => handle(e)}
                                  ></input>
                                  <small className="text-danger">
                                    {registerauth.confirmpasswordvalid}
                                  </small>
                                </div>
                              </div>
                              <div className="form-group position-relative mb-4">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                  >
                                    Type Account
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>{setregisterauth({...registerauth , isAdmin:true})}}>
                                      Admin
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{setregisterauth({...registerauth , isAdmin:false}) ; console.log(registerauth.isAdmin)}}>
                                      User
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="dark"
                          onClick={(e) => {
                            submitAddUser(e);
                            handleClose();
                          }}
                        >
                          submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Email Verified</th>
                      <th className="border-0">Is Admin</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Users?.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user.displayName}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.emailVerified ? <i class="fas fa-check "></i> :<i class="fas fa-exclamation-triangle text-warning"></i> }</td>
                          <td>{user.isAdmin? <Badge bg="danger" text="light">Admin</Badge>:""}</td>
                          <td>
                           {!user.isAdmin ? <div>
                              <button
                              className="btn "
                              onClick={() => {
                                editUser(user.uid);
                                handleShow();
                              }}
                            >
                              <i class="far fa-edit"></i>
                              </button>
                              <button
                              className="btn "
                              onClick={() => deleteUser(user.uid)}
                            >
                              <i class="fas fa-times"></i>
                              </button>
                            </div>:''}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

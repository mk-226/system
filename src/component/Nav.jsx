import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faBell, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import { faChalkboardTeacher, faUserGroup, faSchool } from '@fortawesome/free-solid-svg-icons'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import Sidebar from './Sidebar/SidebarNav.jsx';

function Nav() {
  const [teacher, setTeacher] = useState([]);
  // const {userId} =  useParams()
  const user = localStorage.getItem('users')
  const username = localStorage.getItem('username')
  const userid = localStorage.getItem('id')
  const studentType = localStorage.getItem('type')
  const [student, setStudent] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {

    fetch('http://localhost:3001/teacher/')
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data)
      })


  }, [])

  useEffect(() => {

    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent(data)
      })


  }, [])


  const handleSub = (event) => {

    event.target.nextElementSibling.classList.toggle('show-li')
  };
  const msgs = useRef(null);

  useMountEffect(() => {
    msgs.current.show({
      severity: 'info',
      sticky: true,
      closable: false,
      content: (
        <React.Fragment>
          <div className="ml-2">تصرّف كما لو أنّه من المستحيل أن تفشل.</div>
        </React.Fragment>
      )
    });
  });
  const logo = 'https://png.pngtree.com/png-clipart/20220704/ourmid/pngtree-egypt-flag-png-image_5686481.png'
  return (
    <>
      <nav class="navbar navbar-light " style={{ marginBottom: "1rem", backgroundColor: "white", borderRadius: "10px", padding: "0.4rem", display: "flex" }}>
        <a class="navbar-brand" href="#">
          <button className='sidebar-show btn btn-priamry'
            onClick={() => {


              setShowDropdown(!showDropdown)
            }}><FontAwesomeIcon icon={faBars} style={{ verticalAlign: "middle", color: "#697a8d" }}></FontAwesomeIcon></button>
          <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="" style={{ backgroundColor: "transparent", marginLeft: "0.6rem" }} />
          مالك سكول
        </a>
        <div class="navbar-brand" href="#" style={{ display: "flex", marginLeft: "1rem" }}>
          <a href=""><FontAwesomeIcon icon={faBell} style={{ verticalAlign: "middle", marginLeft: "1rem" }}></FontAwesomeIcon></a>
          <a href=""><FontAwesomeIcon icon={faEnvelope} style={{ verticalAlign: "middle", marginLeft: "1rem" }}></FontAwesomeIcon></a>

          <a href="/login"><FontAwesomeIcon icon={faPersonWalkingArrowRight} style={{ verticalAlign: "middle", color: "#697a8d" }}></FontAwesomeIcon></a>


        </div>

      </nav>
      <div className="">
        <Messages ref={msgs} />

        {/* <ul className={showDropdown? "dropdown-menu" : "d-none"} style={{position:"absolute",top:"50px",left:"0"}}></ul> */}

      </div>
      <Sidebar showDropdown={showDropdown} setShowDropdown={setShowDropdown}></Sidebar>
    </>


  )
}

export default Nav
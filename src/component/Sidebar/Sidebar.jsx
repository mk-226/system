


import { NavLink } from "react-router-dom";
import './style.css'
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import { faChalkboardTeacher, faUserGroup, faSchool } from '@fortawesome/free-solid-svg-icons'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

function Sidebar() {

  const [teacher, setTeacher] = useState([]);
  // const {userId} =  useParams()
  const user = localStorage.getItem('users')
  const username = localStorage.getItem('username')
  const userid = localStorage.getItem('id')
  const studentType = localStorage.getItem('type')
  const [student, setStudent] = useState([])
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
  return (
    <>

      <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme ">

        <div className="app-brand demo" style={{ textAlign: "center" }}>
          <a href="/" className="logo">

            <FontAwesomeIcon icon={faSchool} />
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className={username == "admin" ? "menu-inner py-1" : "d-none"}>

          <li className="menu-item">

            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span>
              الموظفين
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/teacher" className="menu-link menu-item-link" >
                  <div data-i18n="Basic">اضافة موظف جديد</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/show-teacher" className="menu-link menu-item-link" >
                  <div data-i18n="Basic">بيانات الموظفين</div>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink to="/absent-employ" className="menu-link menu-item-link" >
                  <div data-i18n="Basic"> غياب الموظفين</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/messages" className="menu-link menu-item-link" >
                  <div data-i18n="Basic"> تكليفات الموظفين </div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/attendance" className="menu-link menu-item-link" >
                  <div data-i18n="Basic"> حضور الموظفين </div>
                </NavLink>
              </li>


            </ul>
          </li>


          <li className="menu-item">
            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faUserGroup} />
              </span>
              الجانب التعليمي
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/TimetablePage" className="menu-link menu-item-link" >
                  <div data-i18n="Basic"> الجدول المدرسي  </div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/EmpMessagesPage" className="menu-link menu-item-link" >
                  <div data-i18n="Basic"> رسائل العاملين للادارة   </div>
                </NavLink>
              </li>

            </ul>
          </li>


          <li className="menu-item">
            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faUserGroup} />
              </span>
              الطلاب
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <NavLink to="/add-student" className="menu-link menu-item-link" >
                  اضافة الطلاب
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/showstudent" className="menu-link menu-item-link" >
                  بيانات الطلاب
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/classlist" className="menu-link menu-item-link" >
                  قوائم الفصول
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/studenttoadmin" className="menu-link menu-item-link" >
                  رسائل ولي الامر
                </NavLink>
              </li>

            </ul>
          </li>





        </ul>
        <ul className={username !== "admin" && studentType !== "student" ? "menu-inner py-1" : "d-none"}>

          <li className="menu-item">

            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span>
              الجانب الاداري
            </a>
            <ul className="menu-sub">

              <li className="menu-item">
                <NavLink to={"/userinfo/" + userid} className="menu-link menu-item-link" >
                  <div data-i18n="Basic">بياناتي</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={"/myAttendance/" + userid} className="menu-link menu-item-link" >
                  <div >حضوري</div>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink to={"/myStudents/" + userid} className="menu-link menu-item-link" >
                  <div >طلابي</div>
                </NavLink>
              </li>


            </ul>
          </li>
          <li className="menu-item">

            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span>
              الجانب التعليمي
            </a>
            <ul className="menu-sub">

              <li className="menu-item">
                <NavLink to={"/mytimetable/" + userid} className="menu-link menu-item-link" >
                  <div >جدولي</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={"/messagestoadmin/" + userid} className="menu-link menu-item-link" >
                  <div >رسائلي</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={"/homework/" + userid} className="menu-link menu-item-link" >
                  <div >الواجبات</div>
                </NavLink>
              </li>

            </ul>
          </li>

        </ul>
        <ul className={studentType === "student" ? "menu-inner py-1" : "d-none"}>

          <li className="menu-item">

            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span>
              الجانب الاداري
            </a>
            <ul className="menu-sub">

              <li className="menu-item">
                <NavLink to={"/student-info/" + userid} className="menu-link menu-item-link" >
                  <div data-i18n="Basic">بياناتي</div>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to={"/studentmessagestoadmin/" + userid} className="menu-link menu-item-link" >
                  <div >راسل الادارة</div>
                </NavLink>
              </li>
              {/* <li className="menu-item">
                      <NavLink  to={"/myAttendance/"+userid} className="menu-link menu-item-link" >
                        <div >فصلي</div>
                      </NavLink>
                    </li> */}


            </ul>
          </li>
          <li className="menu-item">

            <a className="menu-link menu-toggle" onClick={handleSub}>
              <span>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </span>
              الجانب التعليمي
            </a>
            <ul className="menu-sub">

              <li className="menu-item">
                <NavLink to={"/mytimetables/" + userid} className="menu-link menu-item-link" >
                  <div >جدولي</div>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink to={"/myhomework/" + userid} className="menu-link menu-item-link" >
                  <div >واجباتي</div>
                </NavLink>
              </li>


            </ul>
          </li>

        </ul>
      </aside>

    </>
  )
}

export default Sidebar
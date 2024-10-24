import MyStudents from "../src/component/showTeacher/MyStudents"

import React from 'react'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
function MyStudentsPage() {
  return (
    <>
      <div class="main-container" id="container">

        <Sidebar></Sidebar>
        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <MyStudents />


            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default MyStudentsPage
import React from 'react'
import StudentInfo from '../../src/component/Student/ShowStudent/StudentInfo'
import Sidebar from '../../src/component/Sidebar/Sidebar'
import Nav from '../../src/component/Nav'

function StudentInfoPage() {
  return (

    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <StudentInfo />


            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default StudentInfoPage
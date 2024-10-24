
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
import TeacherInfo from '../src/component/teacherInfo/teacherInfo'
import React from 'react';


function TeacherInfoPage() {



  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <TeacherInfo />


            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default TeacherInfoPage
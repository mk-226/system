
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
import TeacherEditInfo from '../src/component/teacherInfo/teacherEditInfo'
import React from 'react';


function TeacherEditInfoPage() {



  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <TeacherEditInfo />



            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default TeacherEditInfoPage
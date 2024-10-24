
import Sidebar from '../../src/component/Sidebar/Sidebar'
import Nav from '../../src/component/Nav'
import React from 'react';
import StudentEditInfo from '../../src/component/Student/studentEditInfo';


function StudentEditInfoPage() {



  return (
    <>

      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <StudentEditInfo />


            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default StudentEditInfoPage
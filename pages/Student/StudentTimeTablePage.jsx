import React from 'react'

import StudentTimeTable from '../../src/component/Student/StudentTimeTable'
import Sidebar from '../../src/component/Sidebar/Sidebar'
import Nav from '../../src/component/Nav'
function StudentTimeTablePage() {
  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <StudentTimeTable />


          </div>
        </div>

      </div>

    </div>

  )
}

export default StudentTimeTablePage
import React from 'react'
import Attendance from '../src/component/Attendance/Attendance'

import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
function AttendancePage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <Attendance />


            </div>
          </div>

        </div>

      </div>

    </>

  )
}

export default AttendancePage
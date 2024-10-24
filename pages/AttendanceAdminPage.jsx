import React from 'react'
import AdminAttendance from '../src/component/Attendance/AdminAttendance'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'

function AttendanceAdminPage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <AdminAttendance />


            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default AttendanceAdminPage
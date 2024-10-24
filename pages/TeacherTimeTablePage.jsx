import React from 'react'

import TimeTable from '../src/component/timetable/teacherTimeTable';
import Sidebar from '../src/component/Sidebar/Sidebar';
import Nav from '../src/component/Nav';
Nav

function TeacherTimeTablePage() {
  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <TimeTable />



          </div>
        </div>

      </div>

    </div>
  )
}

export default TeacherTimeTablePage
import React from 'react'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
import TeacherInfo from '../src/component/teacherInfo/teacherInfo'
import ShowTeacher from '../src/component/showTeacher/showTeacher'


function ShowTeacherPage() {
  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <ShowTeacher />



          </div>
        </div>

      </div>

    </div>
  )
}

export default ShowTeacherPage
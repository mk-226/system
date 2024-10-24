import React from 'react'
import ShowStudent from '../../src/component/Student/ShowStudent/ShowStudent'
import Nav from '../../src/component/Nav'
import Sidebar from '../../src/component/Sidebar/Sidebar'

function ShowStudentPage() {
  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <ShowStudent />



          </div>
        </div>

      </div>

    </div>
  )
}

export default ShowStudentPage
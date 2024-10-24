import React from 'react'
import Sidebar from '../../src/component/Sidebar/Sidebar'
import Nav from '../../src/component/Nav'
import AddStudent from '../../src/component/Student/AddStudent'

function AddStudentPage() {
  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <AddStudent />



          </div>
        </div>

      </div>

    </div>
  )
}

export default AddStudentPage
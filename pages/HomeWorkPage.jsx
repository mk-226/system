import React from 'react'
import HomeWork from '../src/component/HomeWork/HomeWork'
import Nav from '../src/component/Nav'
import Sidebar from '../src/component/Sidebar/Sidebar'

function HomeWorkPage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <HomeWork />


            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default HomeWorkPage
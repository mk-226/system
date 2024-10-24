import React from 'react'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Home from '../src/component/Home'
import Nav from '../src/component/Nav'
function HomePage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <Home />


            </div>
          </div>

        </div>

      </div>
    </>

  )
}

export default HomePage
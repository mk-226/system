import React from 'react'
import NotFound from '../src/component/NotFound'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'

function NotFoundPage() {
  return (
    <div class="main-container" id="container">
    <Sidebar></Sidebar>

    <div id="content">
      <div class="middle-content container-xxl p-0">
        <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
          <Nav />

          <NotFound />



        </div>
      </div>

    </div>

  </div>
  )
}

export default NotFoundPage

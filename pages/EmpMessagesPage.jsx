import EmpMessages from "../src/component/Message/EmpMessages"
import Nav from "../src/component/Nav"
import Sidebar from "../src/component/Sidebar/Sidebar"

Nav

function EmpMessagesPage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <EmpMessages></EmpMessages>


            </div>
          </div>

        </div>

      </div>

    </>

  )
}

export default EmpMessagesPage
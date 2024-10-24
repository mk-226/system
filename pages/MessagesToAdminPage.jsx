import Messagestoadmin from "../src/component/Message/messagestoadmin"
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'

Messagestoadmin
function MessagesToAdminPage() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <Messagestoadmin></Messagestoadmin>



            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default MessagesToAdminPage
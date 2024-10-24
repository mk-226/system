import StudentToAdmin from "../src/component/Message/StudentToAdmin"
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'

function MessagesFromStudentToAdmin() {
  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <StudentToAdmin />



            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default MessagesFromStudentToAdmin

import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'
import React from 'react';
import UserInfo from '../src/component/Users/userInfo';

function UserInfoPage() {



  return (
    <>
      <div class="main-container" id="container">
        <Sidebar></Sidebar>

        <div id="content">
          <div class="middle-content container-xxl p-0">
            <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
              <Nav />

              <UserInfo />



            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default UserInfoPage 
import React from 'react'
import Login from '../src/component/Users/login'


function UsersPage() {
  return (
    <div>
      <div className='container d-flex'>

        <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>


          <Login />

        </div>


      </div>


    </div>
  )
}

export default UsersPage
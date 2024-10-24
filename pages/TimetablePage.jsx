// App.js
import React, { useState } from 'react';
import TimeTable from '../src/component/timetable/timetable';
import Sidebar from '../src/component/Sidebar/Sidebar';
import Nav from '../src/component/Nav';



function TimetablePage() {



  return (
    <div class="main-container" id="container">
      <Sidebar></Sidebar>

      <div id="content">
        <div class="middle-content container-xxl p-0">
          <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
            <Nav />

            <TimeTable />



          </div>
        </div>

      </div>

    </div>
  );
};

export default TimetablePage;
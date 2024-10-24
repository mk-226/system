import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Tooltip } from 'primereact/tooltip';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/primereact/resources/primereact.min.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primereact/resources/themes/lara-light-cyan/theme.css'
import './style.css'





function ShowTeacher() {
  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })
  }, [])


  return (
    <>
      {/* <Sidebar/> */}
      <div className="card" style={{ marginTop: "3rem" }}>
        <DataTable value={
          teachers.map((teacher) => {
            return {
              code: teacher.id,
              name: teacher.name,
              job: teacher.job,
              nationalId: teacher.nationalId,
              number: teacher.number,
              representative: <>

                <a href={"/teacher-info/" + teacher.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></a>
                <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                  fetch('http://localhost:3001/teacher/' + teacher.id, {
                    method: 'DELETE',
                  })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res))
                  event.target.parentNode.parentNode.parentNode.style.display = "none"

                }}></FontAwesomeIcon>

                <NavLink className="edit" to={"/teacher-edit/" + teacher.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faPenToSquare}></FontAwesomeIcon></NavLink>
              </>

            }
          })
        } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem', overflowX: "auto" }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" sortable filter filterPlaceholder="Search" />
          <Column field="number" sortable filter header="رقم الهاتف" filterPlaceholder="Search" />
          <Column field="nationalId" sortable filter header=" الرقم القومي" filterPlaceholder="Search" />
          <Column field="job" sortable header="الوظيفة" filterField="job" filter filterPlaceholder="Search" />
          <Column field="representative" header="" />
        </DataTable>
      </div>





      {/* <button onClick={generatePDF}>Export to PDF</button> */}
    </>
  )
}

export default ShowTeacher
import React, { useState, useEffect, useRef } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import Sidebar from '../../Sidebar/Sidebar';
import Nav from '../../Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
function ShowStudent() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent([...data])
      })
  }, [])


  return (
    <>


      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          student.map((student) => ({
            // key: index,
            name: student.name,
            nationalId: student.nationalId,
            fatherPhone: student.fatherPhone,
            address: student.address,
            representative: <>
              <div className='d-flex'>
                <a href={"/student-info/" + student.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></a>

                <a><FontAwesomeIcon style={{ margin: "0 0.7rem", color: "red" }} icon={faTrash} onClick={(event) => {

                  fetch('http://localhost:3001/Student/' + student.id, {
                    method: 'DELETE',
                  })
                    .then(res => res.text()) // or res.json()
                    .then()
                  event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"




                }}></FontAwesomeIcon></a>
                <NavLink className="edit" to={"/edit-student/" + student.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faPenToSquare}></FontAwesomeIcon></NavLink>
              </div>
            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="nationalId" header="الرقم القومي" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="fatherPhone" header="رقم هاتف الاب" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="address" header="العنوان" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header="" style={{ width: '25%' }} ></Column>
        </DataTable>







      </div>


    </>
  )
}

export default ShowStudent
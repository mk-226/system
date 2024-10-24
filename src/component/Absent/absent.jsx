import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Calendar } from 'primereact/calendar';
import Nav from '../Nav';
import { MultiSelect } from 'primereact/multiselect';
import Teacher from '../Teacher/Teacher';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';



function Absent() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })
  }, [])

  const [absentEmpData, setAbsentEmpData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/absentEmploy')
      .then((response) => response.json())
      .then((data) => {
        setAbsentEmpData([...data])
      })
  }, [])


  // console.log(absentEmpData);



  const [absentDay, setAbsentDay] = useState();
  const [selectedEmploy, setSelectedEmploy] = useState(null);
  const Employ = teachers.map((teacher) => ({ name: teacher.name, id: teacher.id }));

  return (

    <div style={{ marginTop: "1rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>
        <label for="inputPassword4" className="form-label"> الموظف</label>
        <MultiSelect value={selectedEmploy} onChange={(e) => setSelectedEmploy(e.value)} options={Employ} optionLabel="name"
          filter placeholder="اختر اسم الموظف" maxSelectedLabels={10} className="w-full md:w-20rem" />
        <label for="inputPassword4" className="form-label" style={{ marginTop: "3rem" }}>التاريخ</label>
        <Calendar dateFormat="dd/mm/yy" className='form-control' onChange={(e) => {

          setAbsentDay(e.target.value)
        }} />
        <div className="col-12 text-center my-5">
          <button type="button" className="btn btn-info " onClick={() => {
            if (!selectedEmploy || !absentDay) {
              alert("من فضلك اختر الموظف و التاريخ")

            }

            else {
              selectedEmploy.map((emp) => {
                fetch("http://localhost:3001/absentEmploy", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },

                  // assuming you want to send each employee object in the array
                  body: JSON.stringify({
                    emp,

                    absentDay: absentDay
                  })


                })
              })
            }

            setTimeout(() => {
              location.assign("/absent-employ")
            }, 1000)

          }


          }>حفظ الغياب</button>
        </div>

      </div>

      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          absentEmpData.map((emp) => ({
            // key: index,
            name: emp.emp.name,
            day: new Date(emp.absentDay).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }),
            representative: <>

              <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                fetch('http://localhost:3001/absentEmploy/' + emp.id, {
                  method: 'DELETE',
                })
                  .then(res => res.text()) // or res.json()
                  .then(res => console.log(res))
                event.target.parentNode.parentNode.parentNode.style.display = "none"

              }}></FontAwesomeIcon>
            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="day" header="التاريخ" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header="" style={{ width: '25%' }} ></Column>
        </DataTable>







      </div>

    </div>

  )
}

export default Absent

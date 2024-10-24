import React, { useState, useEffect } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

function AdminAttendance() {
  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }

  const userId = localStorage.getItem('id')
  const [AttendanceEmp, setAttendanceEmp] = useState([]);
  // const [userAttend , setUserAttend] = useState([]);
  // const [User , setuser] = useState([]);


  // const [userAttendArray , setUserAttendArray] = useState([]);



  useEffect(() => {

    fetch('http://localhost:3001/Attendance')
      .then((response) => response.json())
      .then((data) => {
        setAttendanceEmp([...data])
      })



  }, [])



  return (
    <>
      <div style={{ width: "100%", marginTop: "5rem", position: "relative" }}>


        <div className="card" style={{ marginTop: "3rem" }}>
          <DataTable value={
            AttendanceEmp.map((attend) => {
              return {
                code: attend.id,
                name: attend.emp.name,
                hour: attend.hour,
                attend: attend.day,
                lateMinutes: attend.lateMinutes,


                representative: <>

                </>

              }
            })
          } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">

            <Column field="name" header="الاسم" sortable filter filterPlaceholder="Search" />
            <Column field="attend" sortable filter header="اليوم" filterPlaceholder="Search" />
            <Column field="hour" sortable filter header=" الساعة " filterPlaceholder="Search" />
            <Column field="lateMinutes" sortable header="دقائق التأخير" filterField="job" filter filterPlaceholder="Search" />

          </DataTable>
        </div>


      </div>
    </>
  )
}



export default AdminAttendance
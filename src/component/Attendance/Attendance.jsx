import React, { useState, useEffect, useRef } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import TimeTable from '../timetable/timetable';
TimeTable
function Attendance() {

  const usernamedata = localStorage.getItem('username')
  if (usernamedata == "admin") {

    location.assign('/')
  }

  const userId = localStorage.getItem('id')
  const [teachers, setTeachers] = useState([]);
  const [AttendanceEmp, setAttendanceEmp] = useState([]);
  const [userAttend, setUserAttend] = useState([]);
  const [User, setuser] = useState([]);


  const [userAttendArray, setUserAttendArray] = useState([]);


  useEffect(() => {


    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })



  }, [])


  useEffect(() => {


    fetch('http://localhost:3001/Attendance')
      .then((response) => response.json())
      .then((data) => {
        setAttendanceEmp([...data])
      })



  }, [])

  useEffect(() => {

    teachers.map((teacher) => {
      if (userId === teacher.id) {
        setuser(teacher)
      }
    })

  }, [teachers, userId])

  useEffect(() => {
    const now = new Date();
    const day = now.getDay()
    const month = now.getMonth()
    const year = now.getFullYear()
    const date = `${day}-${month + 1}-${year}`


    AttendanceEmp.map((attend) => {
      if (userId === attend.emp.id && attend.day === date) {
        console.log(attend.day);

        setUserAttend(attend.emp)
      }
      if (userId === attend.emp.id) {
        setUserAttendArray((userAttendArray) => [...userAttendArray, attend])


      }
      console.log(userAttendArray);


    })

    console.log(date);

  }, [AttendanceEmp, userId])



  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'نم تسجيل الحضور بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'يرجي ادخال الموظف و التكليف', life: 3000 });
  }
  const showSendError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: `لقد تم تسجيل حضورك من قبل : ${userAttend.name}  `, life: 3000 });
  }

  return (
    <>

      <div style={{ width: "100%", marginTop: "5rem", position: "relative" }}>
        <div>
          <Toast ref={toast} />
          <button className="btn btn-primary " onClick={() => {

            if (userAttend.id === userId) {
              showSendError()
            }
            else {

              const now = new Date();
              const hours = now.getHours();
              const minutes = now.getMinutes();
              const time = `${hours}:${minutes}`
              const day = now.getDay()
              const month = now.getMonth()
              const year = now.getFullYear()
              const date = `${day}-${month + 1}-${year}`
              // Expected arrival time (7:20 AM)
              const expectedArrivalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 20);

              // Calculate the difference in minutes
              const lateMinutes = Math.max(0, Math.floor((now - expectedArrivalTime) / (1000 * 60)));
              fetch('http://localhost:3001/Attendance',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    emp: { name: User.name, id: User.id }
                    , day: date
                    , hour: time,
                    lateMinutes: lateMinutes
                  })

                })
                .then(response => response.json())
                .then((data) => {
                  showSuccess()
                  location.reload()
                })
                .catch(error => showError())

            }


          }} >
            تسجيل الحضور
          </button>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <DataTable value={
            userAttendArray.map((attend) => {
              return {
                code: attend.id,
                name: attend.emp.name,
                hour: attend.hour,
                attend: attend.day,
                lateMinutes: attend.lateMinutes,


              }
            })
          } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">

            <Column field="name" header="الاسم" />
            <Column field="attend" sortable filter header="اليوم" filterPlaceholder="Search" />
            <Column field="hour" sortable filter header=" الساعة " filterPlaceholder="Search" />
            <Column field="lateMinutes" sortable header="دقائق التأخير" filterField="job" filter filterPlaceholder="Search" />

          </DataTable>
        </div>


      </div>
    </>
  )
}

export default Attendance
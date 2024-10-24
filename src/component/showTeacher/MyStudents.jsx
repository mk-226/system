import React, { useState, useEffect, useRef } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import TimeTable from '../timetable/timetable';
TimeTable
function MyStudents() {

  const usernamedata = localStorage.getItem('username')
  if (usernamedata == "admin") {

    location.assign('/')
  }

  const userId = localStorage.getItem('id')
  const [teachers, setTeachers] = useState([]);
  const [classList, setClassList] = useState([]);
  const [userClass, setUserClass] = useState([]);
  const [MyClass, setMyClass] = useState([]);
  const [User, setuser] = useState();


  const [userMyStudent, setUserMyStudent] = useState([]);


  useEffect(() => {


    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })



  }, [])


  useEffect(() => {


    fetch('http://localhost:3001/timeTables')
      .then((response) => response.json())
      .then((data) => {
        setUserClass([...data])
      })



  }, [])
  useEffect(() => {


    fetch('http://localhost:3001/classList')
      .then((response) => response.json())
      .then((data) => {
        setClassList([...data])
      })



  }, [])

  useEffect(() => {

    teachers.map((teacher) => {
      if (userId === teacher.id) {
        setuser(teacher.name)
      }
    })

  }, [teachers, userId])


  const [editStudents, setEditStudents] = useState(new Set());
  const [listedStudents, setListedStudents] = useState([]);

  useEffect(() => {
    const updatedEditStudents = new Set();
    userClass.forEach((data) => {

      if (User === data.selectedTeacher) {

        updatedEditStudents.add(data.selectedClass);
      }

    });
    setEditStudents(updatedEditStudents);
  }, [userClass, User]);


  useEffect(() => {
    const updatedListedStudents = [];
    classList.forEach((classlist) => {

      if (editStudents.has(classlist.class)) {
        updatedListedStudents.push(classlist.student.name);
      }
    });
    setListedStudents(updatedListedStudents);
  }, [classList, editStudents]);


  return (
    <>

      <div style={{ width: "100%", marginTop: "5rem", position: "relative" }}>

        <div className="card" style={{ marginTop: "1rem" }}>
          <DataTable value={
            listedStudents.map((student) => {
              return {
                code: student,
                name: student,



              }
            })
          } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">

            <Column field="name" header="اسم الطالب" sortable filter filterPlaceholder="Search" />
            {/* <Column field="attend" sortable filter header="اليوم" filterPlaceholder="Search" />
                  <Column field="hour" sortable filter header=" الساعة " filterPlaceholder="Search" />
                  <Column field="lateMinutes" sortable header="دقائق التأخير" filterField="job"  filter filterPlaceholder="Search" /> */}

          </DataTable>
        </div>


      </div>
    </>
  )
}

export default MyStudents
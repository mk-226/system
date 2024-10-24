import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../Nav';

function StudentTimeTable() {

  const userId = localStorage.getItem('id')
  const [timeTable, settimeTable] = useState([]);

  const [students, setStudent] = useState([]);
  const [classList, setClassList] = useState([]);
  const [currentStudent, setCurrentStudent] = useState([]);
  const [timeTableStudent, settimeTableStudent] = useState([]);




  useEffect(() => {
    fetch('http://localhost:3001/classList')
      .then((response) => response.json())
      .then((data) => {
        setClassList([...data])
        // console.log(data);

      })



  }, [])


  useEffect(() => {

    classList.map((classlist) => {
      if (classlist.student.id === userId) {
        setCurrentStudent(classlist)
      }
    })



  }, [classList, userId])



  useEffect(() => {
    fetch('http://localhost:3001/timeTables')
      .then((response) => response.json())
      .then((data) => {
        settimeTable([...data])



      }).catch((err) => {
        console.log("asas");
      })
  }, [])

  useEffect(() => {
    timeTable.map((table) => {

      if (table.selectedClass === currentStudent.class && table.selectedSemester === currentStudent.semester) {
        settimeTableStudent((prev) => [...prev, table])
        console.log(timeTableStudent);

      }


    })
  }, [timeTable, currentStudent])


  return (
    <>


      <div className="card" style={{ marginTop: "1rem", height: "fit-content", overflowY: "auto" }}>


        <DataTable value={
          timeTableStudent.map((time) => {
            return {
              code: time.id,
              name: time.selectedTeacher,
              day: time.selectedDay,
              period: time.selectedPeriod,
              subject: time.selectedSubject,
              class: time.selectedClass,
              semester: time.selectedSemester


            }
          })

        } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">

          <Column field="name" header="اسم المعلم " />
          <Column field="day" sortable filter header="اليوم" sortField="day" filterField='day' />
          <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
          <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
          <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
          <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />

        </DataTable>







      </div>






    </>
  );
};

export default StudentTimeTable;
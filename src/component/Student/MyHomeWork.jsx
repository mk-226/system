
import React, { useState, useEffect, useRef } from 'react'
import Nav from '../Nav';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Editor } from "primereact/editor";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import Sidebar from '../Sidebar/Sidebar';

function MyHomeWork() {
  const [text, settext] = useState(false)


  const [Student, setStudent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent([...data])
      })
  }, [])



  const userId = localStorage.getItem('id')


  const [selectedStudent, setSelcetedStudent] = useState()


  const [classList, setClassList] = useState([])


  useEffect(() => {
    fetch('http://localhost:3001/classList')
      .then((response) => response.json())
      .then((data) => {
        setClassList([...data])
      })
  }, [])

  useEffect(() => {
    classList.map((classlist) => {

      if (classlist.student.id === userId) {

        setSelcetedStudent(classlist)
      }
    })

  }, [classList, userId])


  const [UserHomeWork, setUserHomework] = useState([])
  const [homeworkData, setHomeworkData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/homework')
      .then((response) => response.json())
      .then((data) => {
        setHomeworkData([...data])
      })
  }, [])


  const [homeworkOfClass, setHomeWorkOfClass] = useState([])

  useEffect(() => {
    homeworkData.map((homework) => {

      if (homework === undefined || homework === "") {
        return
      } else {
        setHomeWorkOfClass((prv) => [...prv, homework])

      }


    })

  }, [homeworkData])

  const [showHomework, setShowHomework] = useState([])
  useEffect(() => {
    homeworkOfClass.map((homework) => {

      homework.homeworkclass.map((homeworkClass) => {
        if (homeworkClass.class == undefined || selectedStudent == undefined) {

          return
        }
        else if (homeworkClass.class === selectedStudent.class) {

          setUserHomework((prev) => [...prev, homework]);
        }

      })


    })

  }, [homeworkOfClass, selectedStudent])



  return (


    <div style={{ marginTop: "3rem", padding: "2rem" }} >


      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          UserHomeWork.map((homework) => ({
            // key: index,
            created_at: homework.created_at,
            name: homework.teacher.name,
            homework: homework.homework.replace(/<[^>]+>/g, ''),
            lesson: homework.lesson,
            homeworktype: homework.homeworktype,
            representative: <>

              <button style={{ border: "none", outline: "none", background: "transparent" }} className="edit"
                onClick={() => {
                  settext(true)
                  setShowHomework(homework);

                }}
              ><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></button>


              <div className={text === false ? "modal fade d-none" : "modal fade show "} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div class="modal-dialog" style={{ width: "38%", transform: "translate(20%, 2%)" }}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel"> عرض الواجب</h5>

                    </div>
                    <div class="modal-body">
                      <h6>الواجب</h6>
                      <Editor value={showHomework.homework} readOnly style={{ height: '160px' }} />
                    </div>
                    <hr style={{ border: "6px solid" }} />
                    <div class="modal-body">
                      <h6>الاجابة</h6>
                      <Editor value={showHomework.homework} readOnly style={{ height: '160px' }} />
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                        settext(false)
                      }}>اغلاق</button>
                    </div>


                  </div>
                </div>
              </div>




            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="created_at" header="تاريخ الانشاء" style={{ width: '15%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="name" header="اسم المعلم" style={{ width: '20%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="homework" header="الواجب" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="lesson" header="الدرس" style={{ width: '12%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="homeworktype" header="نوع الواجب" style={{ width: '20%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header=" " style={{ width: '8%' }} so></Column>
        </DataTable>


      </div>

    </div>

  )
}

export default MyHomeWork
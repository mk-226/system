
import React, { useState, useEffect, useRef } from 'react'
import Nav from '../Nav';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShareFromSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { Editor } from "primereact/editor";


import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import Sidebar from '../Sidebar/Sidebar';

function HomeWork() {
  const [text, settext] = useState(false)
  const [share, setShare] = useState(false)
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم حفظ الواجب  بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي ملئ الحقول', life: 3000 });
  }
  const showٍServerError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' حدثت مشكلة اثناء تنفيذ العملية ربما فقدنا الاتصال بالانترنت او السيرفر', life: 6000 });
  }

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })
  }, [])


  // const [classListHomeworkold , setclassListHomeworkold] = useState([])
  const userId = localStorage.getItem('id')


  const [selectedTeacher, setSelcetedTeacher] = useState()
  useEffect(() => {
    teachers.map((teacher) => {
      if (teacher.id === userId) {

        setSelcetedTeacher(teacher)
      }
    })

  }, [teachers, userId])


  const [UserHomeWork, setUserHomework] = useState([])
  const [homeworkData, setHomeworkData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/homework')
      .then((response) => response.json())
      .then((data) => {
        setHomeworkData([...data])
      })
  }, [])


  useEffect(() => {
    homeworkData.map((homework) => {


      if (homework.teacher.id === userId) {

        setUserHomework((prev) => [...prev, homework]);
      }
    })

  }, [homeworkData, userId])



  const [homeworkOfClass, setHomeWorkOfClass] = useState([])

  useEffect(() => {
    UserHomeWork.map((homework) => {


      if (homework === undefined || homework === "") {
        return
      } else {
        setHomeWorkOfClass((prv) => homework.homeworkclass)

      }


    })

  }, [UserHomeWork])

  const [homeworkClassData, sethomeworkClassData] = useState([])
  useEffect(() => {
    homeworkOfClass.map((homework) => {


      console.log(homework.class);



    })

  }, [homeworkOfClass])

  // console.log(homeworkOfClass);


  const [homework, setHomework] = useState("");

  const [lesson, setLesson] = useState("");
  const [homeworktype, setHomeworktype] = useState("");
  const [homeworkclass, setHomeworkclass] = useState("");
  const [homeworksemester, setHomeworksemester] = useState("");
  // const [homeworktype, setHomeworktype] = useState("");
  const [homeworkStudent, setHomeworkStudent] = useState("");
  const [homeworkId, sethomeworkId] = useState("");
  return (

    <div style={{ marginTop: "1rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>


        <div className="card" style={{ marginTop: "3rem" }} >
          <label for="inputPassword4" className="form-label"> الواجب  </label>
          <Editor onTextChange={(e) => setHomework(e.htmlValue)} style={{ height: '180px' }} />
        </div>
        <form className="row g-3" >
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label"> اسم الدرس</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setLesson(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>الدرس الاول</option>
              <option> الدرس الثاني </option>
              <option>الدرس الثالث</option>
              <option>الدرس الرابع </option>
              <option> الدرس الخامس</option>
            </select>
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">نوع الواجب </label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setHomeworktype(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>الكتروني</option>
              <option> ورقي </option>

            </select>
          </div>

        </form>
        <div className="col-12 text-center my-5">
          <Toast ref={toast} />
          <button type="button" className="btn btn-primary " label="Success" severity="success" onClick={() => {



            if (homework === "" || homework === undefined) {
              showError()

            }

            else {
              const now = new Date();
              const day = now.getDay()
              const month = now.getMonth()
              const year = now.getFullYear()
              const date = `${day}-${month + 1}-${year}`

              fetch("http://localhost:3001/homework", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },

                // assuming you want to send each employee object in the array
                body: JSON.stringify({
                  teacher: { name: selectedTeacher.name, id: selectedTeacher.id },
                  homework: homework,
                  lesson: lesson,
                  homeworktype: homeworktype,
                  created_at: date,
                  homeworkclass: []

                })


              }).then(res => res.text()) // or res.json()
                .then((emp) => {
                  showSuccess()
                  location.reload()
                }).catch((err) => showٍServerError())


            }

          }


          }
          > حفظ الواجب </button>
        </div>

      </div>

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
                  setHomeworkStudent(homework);

                }}
              ><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></button>


              <div className={text === false ? "modal fade d-none" : "modal fade show "} id={homeworkStudent.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div class="modal-dialog" style={{ width: "38%", transform: "translate(20%, 2%)" }}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id={homeworkStudent.id}> عرض الواجب</h5>

                    </div>
                    <div class="modal-body">
                      <h6>الواجب</h6>
                      <Editor value={homeworkStudent.homework} readOnly style={{ height: '160px' }} />
                    </div>
                    <hr style={{ border: "6px solid" }} />


                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                        settext(false)
                      }}>اغلاق</button>
                    </div>


                  </div>
                </div>
              </div>
              <button style={{ border: "none", outline: "none", background: "transparent" }} className="edit"
                onClick={() => {
                  setShare(true)
                  setHomeworkStudent(homework);

                }}
              ><FontAwesomeIcon style={{ margin: "0 0.7rem", color: "green" }} icon={faShareFromSquare}></FontAwesomeIcon></button>
              <div className={share === false ? "modal fade d-none" : "modal fade show "} id={homeworkStudent.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div class="modal-dialog" style={{ maxWidth: "38%", transform: "translate(0, 30%)" }}>
                  <div class="modal-content" style={{ padding: "1rem" }}>
                    <div class="modal-header">
                      <h5 class="modal-title" id={homeworkStudent.id}>  مشاركة الواجب</h5>

                    </div>
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label"> الفصل </label>
                        <select id="inputState" className="form-select" onChange={(event) => {
                          setHomeworkclass(event.target.value);
                        }}>
                          <option selected>اختر...</option>
                          <option>الصف الاول الابتدائي</option>
                          <option>الصف الثاني الابتدائي</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">الصف</label>
                        <select id="inputState" className="form-select" onChange={(event) => {
                          setHomeworksemester(event.target.value);
                        }}>
                          <option selected>اختر...</option>
                          <option>اول</option>
                          <option>ثاني</option>
                        </select>
                      </div>
                    </form>
                    <hr style={{ border: "6px solid" }} />


                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                        setShare(false)
                      }}>اغلاق</button>


                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {


                        if (homeworkclass === "" || homeworkclass === undefined || homeworksemester === "" || homeworksemester === undefined) {
                          showError()
                        }
                        else {
                          const classListHomework = {
                            class: homeworkclass,
                            semester: homeworksemester
                          };

                          homeworkOfClass.push(classListHomework);

                          fetch("http://localhost:3001/homework/" + homeworkStudent.id, {
                            method: "PUT",
                            headers: {
                              'Content-Type': 'application/json'
                            },

                            body: JSON.stringify({
                              id: homeworkStudent.id,
                              teacher: { name: homeworkStudent.teacher.name, id: homeworkStudent.teacher.id },
                              homework: homeworkStudent.homework,
                              lesson: homeworkStudent.lesson,
                              homeworktype: homeworkStudent.homeworktype,
                              created_at: homeworkStudent.created_at,
                              homeworkclass: homeworkOfClass,

                              answer: ""
                            })

                          }).then(res => res.text()) // or res.json()
                            .then((emp) => {
                              showSuccess()
                              location.reload()
                            }).catch((err) => ServerError())
                        }


                      }}>مشاركة</button>
                    </div>

                  </div>
                </div>
              </div>



            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="created_at" header="تاريخ الانشاء" style={{ width: '15%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="name" header="اسم المعلم" style={{ width: '18%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="homework" header="الواجب" style={{ width: '20%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="lesson" header="الدرس" style={{ width: '12%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="homeworktype" header="نوع الواجب" style={{ width: '20%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header=" " style={{ width: '15%' }} so></Column>
        </DataTable>


      </div>

    </div>

  )
}

export default HomeWork
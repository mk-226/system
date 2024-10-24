import React, { useState, useEffect, useRef } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../Nav';
import { Toast } from 'primereact/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
function TimeTable() {
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم اضافة الحصة بنجاح', life: 5000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'يرجي ملئ جميع الحقول ', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي ملئ جميع الحقول ', life: 3000 });
  }
  const showWarn = () => {
    toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'تم حذف الحصة ', life: 3000 });
  }
  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }

  const [timeTable, settimeTable] = useState([]);
  const [timeTableDaySunday, settimeTableDaySunday] = useState([]);
  const [timeTableDayMonday, settimeTableDayMonday] = useState([]);
  const [timeTableDayTuesday, settimeTableDayTuesday] = useState([]);
  const [timeTableDayWednesday, settimeTableDayWednesday] = useState([]);
  const [timeTableDayThursday, settimeTableDayThursday] = useState([]);
  // const [employeMessage, setEmployeMessage] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [jobIsTeacher, setjobIsTeacher] = useState([]);



  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedDay, setSelectedDay] = useState()
  const [selectedPeriod, setSelectedPeriod] = useState()
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedClass, setSlectedClass] = useState()
  const [selectedSemester, setSlectedSemester] = useState()

  useEffect(() => {


    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })



  }, [])
  useEffect(() => {

    teachers.map((teacher) => {
      if (teacher.job === "معلم") {
        setjobIsTeacher((prev) => [...prev, teacher])
      }
    })



  }, [teachers])


  useEffect(() => {
    fetch('http://localhost:3001/timeTables')
      .then((response) => response.json())
      .then((data) => {
        settimeTable([...data])

      })
  }, [])
  useEffect(() => {
    timeTable.map((table) => {
      if (table.selectedDay === "الاحد") {
        settimeTableDaySunday((prev) => [...prev, table])
      }
      else if (table.selectedDay === "الاثنين") {
        settimeTableDayMonday((prev) => [...prev, table])
      }
      if (table.selectedDay === "الثلاثاء") {
        settimeTableDayTuesday((prev) => [...prev, table])
      }
      if (table.selectedDay === "الاربعاء") {
        settimeTableDayWednesday((prev) => [...prev, table])
      }
      if (table.selectedDay === "الخميس") {
        settimeTableDayThursday((prev) => [...prev, table])
      }


    })


  }, [timeTable])


  return (
    <>



      <div className='form-container w-100' style={{ marginBottom: "2rem", paddingBottom: "2rem", marginTop: "5rem" }}>

        <form className="row g-3" style={{ backgroundColor: "#dee2e6a3", borderRadius: "10px", paddingBottom: "2rem" }}>
          <div className="col-md-4">
            <label for="inputCity" className="form-label">اليوم</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSelectedDay(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>الاحد</option>
              <option>الاثنين</option>
              <option>الثلاثاء</option>
              <option>الاربعاء</option>
              <option>الخميس</option>
            </select>
          </div>

          <div className="col-md-4">
            <label for="inputCity" className="form-label">المعلم</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSelectedTeacher(event.target.value);

            }}>

              <option selected>اختر...</option>
              {
                jobIsTeacher.map((teacher, index) => {
                  return <option key={index} >{teacher.name}</option>
                })
              }

            </select>
          </div>

          <div className="col-md-4">
            <label for="inputCity" className="form-label">الحصة</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSelectedPeriod(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>الاولي</option>
              <option>الثانية</option>
              <option>الثالثة</option>
              <option>الرابعة</option>
              <option>الخامسة</option>
              <option>السادسة</option>
              <option>السابعة</option>
              <option>الثامنة</option>
            </select>
          </div>
          <div className="col-md-4">
            <label for="inputCity" className="form-label">المادة</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSelectedSubject(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>اللغة العربية</option>
              <option>اللغة الانجليزية</option>
              <option>الرياضيات</option>
              <option>العلوم</option>
              <option>الدراسات الاجتماعية</option>
              <option>التربية الدينية</option>
              <option>الحاسب الالي</option>
              <option>التربية الرياضية</option>
            </select>


          </div>
          <div className="col-md-4">
            <label for="inputCity" className="form-label">الصف</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSlectedClass(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>الصف الاول الابتدائي</option>
              <option>الصف الثاني الابتدائي</option>
              <option>الصف الثالث الابتدائي</option>
              <option>الصف الرابع الابتدائي</option>
              <option>الصف الخامسة الابتدائي</option>
              <option>الصف السادس الابتدائي</option>

            </select>
          </div>
          <div className="col-md-4">
            <label for="inputCity" className="form-label">الفصل</label>
            <select id="inputState" className="form-select" onChange={(event) => {

              setSlectedSemester(event.target.value);

            }}>
              <option selected>اختر...</option>
              <option>اول</option>
              <option>ثاني</option>
              <option>ثالث</option>
              <option>رابع</option>
              <option>خامس</option>
              <option>سادس</option>
              <option>سابع</option>
              <option>ثامن</option>
            </select>
          </div>

          <div style={{ textAlign: "center" }}>
            <Toast ref={toast} />
            <button type="button" className="btn btn-primary " onClick={() => {

              if (selectedTeacher && selectedDay && selectedPeriod && selectedSubject && selectedClass && selectedSemester) {

                fetch("http://localhost:3001/timeTables", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    selectedDay,
                    selectedTeacher,
                    selectedPeriod,
                    selectedSubject,
                    selectedClass,
                    selectedSemester,

                  })
                }).then((data) => {
                  showSuccess()
                  location.reload()
                }).catch((err) => showError())

              } else {
                showDeleteError()
              }


            }}>اضافة حصة </button>


            <button type="reset" className="btn btn-danger  " style={{ marginRight: "0.5rem" }}> اعادة تعيين </button>

          </div>
        </form>

      </div>
      <div className="card" style={{ marginTop: "1rem", height: "40vh", overflowY: "auto" }}>
        <div className="card">


          <Fieldset legend="الاحد" toggleable collapsed>
            {

              <DataTable value={
                timeTableDaySunday.map((time) => {
                  return {
                    code: time.id,
                    name: time.selectedTeacher,
                    day: time.selectedDay,
                    period: time.selectedPeriod,
                    subject: time.selectedSubject,
                    class: time.selectedClass,
                    semester: time.selectedSemester

                    , representative: <>


                      <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                        fetch('http://localhost:3001/timeTables/' + time.id, {
                          method: 'DELETE',
                        })
                          .then(res => res.text()) // or res.json()
                          .then(res => showWarn())
                        event.target.parentNode.parentNode.parentNode.style.display = "none"

                      }}></FontAwesomeIcon>


                    </>


                  }
                })

              } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
                <Column field="name" header="اسم المعلم" />
                <Column field="day" sortable filter header="اليوم" filterPlaceholder="Search" />
                <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
                <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
                <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
                <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />
                <Column field="representative" />

              </DataTable>



            }

          </Fieldset>


        </div>
        <div className="card">


          <Fieldset legend="الاثنين" toggleable collapsed>
            {

              <DataTable value={
                timeTableDayMonday.map((time) => {
                  return {
                    code: time.id,
                    name: time.selectedTeacher,
                    day: time.selectedDay,
                    period: time.selectedPeriod,
                    subject: time.selectedSubject,
                    class: time.selectedClass,
                    semester: time.selectedSemester

                    , representative: <>


                      <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                        fetch('http://localhost:3001/timeTables/' + time.id, {
                          method: 'DELETE',
                        })
                          .then(res => res.text()) // or res.json()
                          .then(res => showWarn())
                        event.target.parentNode.parentNode.parentNode.style.display = "none"

                      }}></FontAwesomeIcon>


                    </>


                  }
                })

              } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
                <Column field="name" header="اسم المعلم" />
                <Column field="day" sortable filter header="اليوم" filterPlaceholder="Search" />
                <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
                <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
                <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
                <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />
                <Column field="representative" />

              </DataTable>




            }

          </Fieldset>


        </div>
        <div className="card">


          <Fieldset legend="الثلاثاء" toggleable collapsed>
            {

              <DataTable value={
                timeTableDayTuesday.map((time) => {
                  return {
                    code: time.id,
                    name: time.selectedTeacher,
                    day: time.selectedDay,
                    period: time.selectedPeriod,
                    subject: time.selectedSubject,
                    class: time.selectedClass,
                    semester: time.selectedSemester
                    , representative: <>


                      <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                        fetch('http://localhost:3001/timeTables/' + time.id, {
                          method: 'DELETE',
                        })
                          .then(res => res.text()) // or res.json()
                          .then(res => showWarn())
                        event.target.parentNode.parentNode.parentNode.style.display = "none"

                      }}></FontAwesomeIcon>


                    </>


                  }
                })

              } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
                <Column field="name" header="اسم المعلم" />
                <Column field="day" sortable filter header="اليوم" filterPlaceholder="Search" />
                <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
                <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
                <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
                <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />
                <Column field="representative" />

              </DataTable>



            }

          </Fieldset>


        </div>
        <div className="card">


          <Fieldset legend="الاربعاء" toggleable collapsed>
            {

              <DataTable value={
                timeTableDayWednesday.map((time) => {
                  return {
                    code: time.id,
                    name: time.selectedTeacher,
                    day: time.selectedDay,
                    period: time.selectedPeriod,
                    subject: time.selectedSubject,
                    class: time.selectedClass,
                    semester: time.selectedSemester
                    , representative: <>


                      <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                        fetch('http://localhost:3001/timeTables/' + time.id, {
                          method: 'DELETE',
                        })
                          .then(res => res.text()) // or res.json()
                          .then(res => showWarn())
                        event.target.parentNode.parentNode.parentNode.style.display = "none"

                      }}></FontAwesomeIcon>


                    </>


                  }
                })

              } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
                <Column field="name" header="اسم المعلم" />
                <Column field="day" sortable filter header="اليوم" filterPlaceholder="Search" />
                <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
                <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
                <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
                <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />
                <Column field="representative" />

              </DataTable>



            }

          </Fieldset>


        </div>
        <div className="card">


          <Fieldset legend="الخميس" toggleable collapsed>
            {

              <DataTable value={
                timeTableDayThursday.map((time) => {
                  return {
                    code: time.id,
                    name: time.selectedTeacher,
                    day: time.selectedDay,
                    period: time.selectedPeriod,
                    subject: time.selectedSubject,
                    class: time.selectedClass,
                    semester: time.selectedSemester,
                    representative: <>


                      <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                        fetch('http://localhost:3001/timeTables/' + time.id, {
                          method: 'DELETE',
                        })
                          .then(res => res.text()) // or res.json()
                          .then(res => showWarn())
                        event.target.parentNode.parentNode.parentNode.style.display = "none"

                      }}></FontAwesomeIcon>


                    </>


                  }
                })

              } paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
                <Column field="name" header="اسم المعلم" />
                <Column field="day" sortable filter header="اليوم" filterPlaceholder="Search" />
                <Column field="period" sortable filter header="الحصة" filterPlaceholder="Search" />
                <Column field="subject" sortable filter header=" المادة " filterPlaceholder="Search" />
                <Column field="class" sortable header="الصف" filterField="class" filter filterPlaceholder="Search" />
                <Column field="semester" sortable header="الفصل" filterField="class" filter filterPlaceholder="Search" />
                <Column field="representative" />

              </DataTable>



            }

          </Fieldset>


        </div>

      </div>




    </>
  );
};

export default TimeTable;
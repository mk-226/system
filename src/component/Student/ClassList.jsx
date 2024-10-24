import React, { useState, useEffect, useRef } from 'react'

import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../Nav';


function ClassList() {
  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }
  const [students, setStudent] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent([...data])


      })
  }, [])


  const [classListData, setclassListData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/classList')
      .then((response) => response.json())
      .then((data) => {
        setclassListData([...data])
      })
  }, [])

  const [editStudents, setEditStudents] = useState(new Set());
  const [unlistedStudents, setUnlistedStudents] = useState([]);

  useEffect(() => {
    const updatedEditStudents = new Set();
    classListData.forEach((data) => {
      updatedEditStudents.add(data.student.id);
    });
    setEditStudents(updatedEditStudents);
  }, [classListData]);

  useEffect(() => {
    const updatedUnlistedStudents = [];
    students.forEach((stu) => {
      if (!editStudents.has(stu.id)) {
        updatedUnlistedStudents.push(stu);
      }
    });
    setUnlistedStudents(updatedUnlistedStudents);
  }, [students, editStudents]);


  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم اضافة الطالب للفصل', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'لم نتمكن من الاتصال بالسيرفر', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'لا يمكن حذف الطالب من قائمة الفصل ', life: 3000 });
  }



  const [classList, setClassList] = useState(null);
  const [semester, setSemester] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const Students = unlistedStudents.filter((stu) => ({ name: stu.name, id: stu.id }));

  return (

    <div style={{ marginTop: "3rem", padding: "2rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>
        <label for="inputPassword4" className="form-label"> اسم الطالب</label>
        <MultiSelect value={selectedStudent} onChange={(e) => setSelectedStudent(e.value)} options={Students} optionLabel="name"
          filter placeholder="اختر اسم الطالب" maxSelectedLabels={10} className="w-full md:w-20rem" />

        <div className="card" style={{ marginTop: "3rem" }} >
          {/* <label for="inputPassword4" className="form-label"> الفصل  </label> */}
          <select name="" className="form-control" id="" onChange={(event) => {

            setClassList(event.target.value)
          }}>
            <option >اختر الصف</option>
            <option >الصف الاول الابتدائي</option>
            <option >الصف الثاني الابتدائي</option>
            <option >الصف الثالث الابتدائي</option>
            <option>الصف الرابع الابتدائي</option>
            <option >الصف الخامس الابتدائي</option>
            <option >الصف السادس الابتدائي</option>


          </select>
        </div>
        <div className="card" style={{ marginTop: "3rem" }} >
          {/* <label for="inputPassword4" className="form-label"> الفصل  </label> */}
          <select name="" id="" className="form-control" onChange={(event) => {

            setSemester(event.target.value)
          }}>
            <option >اختر الفصل</option>
            <option >اول</option>
            <option >ثاني</option>
            <option >ثالث</option>
            <option >رابع</option>


          </select>
        </div>
        <div className="col-12 text-center my-5">
          <Toast ref={toast} />
          <button type="button" className="btn btn-primary " label="Success" severity="success" onClick={() => {



            selectedStudent.map((stu) => {
              fetch("http://localhost:3001/classList", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },

                // assuming you want to send each employee object in the array
                body: JSON.stringify({
                  student: { name: stu.name, id: stu.id },
                  class: classList,
                  semester: semester
                })


              }).then(res => res.text()) // or res.json()
                .then((stu) => {
                  showSuccess()
                  setTimeout(() => {
                    location.reload()
                  }, 2000)
                }).catch((err) => showError())
            })

          }


          }> حفظ </button>
        </div>

      </div>

      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          classListData.map((student) => ({
            // key: index,
            name: student.student.name,
            class: student.class,
            semester: student.semester,
            representative: <>

              <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {

                fetch('http://localhost:3001/classList/' + student.id, {
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
          <Column field="name" header="اسم الطالب" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="class" header="الصف" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="semester" header="الفصل" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header="" style={{ width: '25%' }} ></Column>
        </DataTable>







      </div>

    </div>

  )
}

export default ClassList

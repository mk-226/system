import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Nav from '../Nav';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { Editor } from "primereact/editor";

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
function Message() {
  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })
  }, [])

  const [teachers, setTeachers] = useState([]);
  const [MessgesData, setMessgesData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then((response) => response.json())
      .then((data) => {
        setMessgesData([...data])
      })
  }, [])

  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: ' تم الارسال', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'يرجي ادخال الموظف و التكليف', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'لا يمكن حذف رسالة تم الرد عليها    ', life: 3000 });
  }



  const [massage, setmassage] = useState();
  const [selectedEmploy, setSelectedEmploy] = useState(null);
  const Employ = teachers.filter((teacher) => (teacher.username === "admin" ? "" : { name: teacher.name, id: teacher.id }));

  return (


    <div style={{ marginTop: "1rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>
        <label for="inputPassword4" className="form-label"> الموظف</label>
        <MultiSelect value={selectedEmploy} onChange={(e) => setSelectedEmploy(e.value)} options={Employ} optionLabel="name"
          filter placeholder="اختر اسم الموظف" maxSelectedLabels={10} className="w-full md:w-20rem" />

        <div className="card" style={{ marginTop: "3rem" }} >
          <label for="inputPassword4" className="form-label"> الرسالة  </label>
          <Editor value={text} onTextChange={(e) => setmassage(e.htmlValue)} style={{ height: '320px' }} />
        </div>
        <div className="col-12 text-center my-5">
          <Toast ref={toast} />
          <button type="button" className="btn btn-primary " label="Success" severity="success" onClick={() => {

            if (!massage) {
              showError()

            }

            else {



              selectedEmploy.map((emp) => {
                fetch("http://localhost:3001/messages", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },

                  // assuming you want to send each employee object in the array
                  body: JSON.stringify({
                    emp: { name: emp.name, id: emp.id },
                    massage: massage,
                    res: ""
                  })


                }).then(res => res.text()) // or res.json()
                  .then((emp) => {
                    showSuccess()
                    location.reload()
                  }).catch((err) => showError())
              })

            }

          }


          }> ارسال الرسالة</button>
        </div>

      </div>

      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          MessgesData.map((emp) => ({
            // key: index,
            name: emp.emp.name,
            massage: emp.massage.replace(/<[^>]+>/g, ''),
            res: emp.res,
            representative: <>

              <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                if (emp.res === "") {
                  fetch('http://localhost:3001/messages/' + emp.id, {
                    method: 'DELETE',
                  })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res))
                  event.target.parentNode.parentNode.parentNode.style.display = "none"
                }
                else {
                  showDeleteError()
                }


              }}></FontAwesomeIcon>
            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="massage" header="" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="res" header="الرد" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header="" style={{ width: '25%' }} ></Column>
        </DataTable>







      </div>

    </div>

  )
}

export default Message

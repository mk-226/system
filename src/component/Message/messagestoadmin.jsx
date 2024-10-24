import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Nav from '../Nav';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { Editor } from "primereact/editor";


import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'

function Messagestoadmin() {
  // const usernamedata = localStorage.getItem('username')
  // if (usernamedata !== "admin") {

  //   location.assign('/')
  // }
  const [massage, setmassage] = useState();
  const [text, setText] = useState('');
  const userId = localStorage.getItem('id')
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState([]);
  const [messagesToAdmin, setMessagesToAdmin] = useState([])
  const [messagesEmp, setMessagesEmp] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })
  }, [])




  useEffect(() => {

    teachers.map((teacher) => {
      if (teacher.id === userId) {
        setCurrentTeacher(teacher)
      }
    })



  }, [teachers, userId])



  useEffect(() => {
    fetch('http://localhost:3001/meassgestoadmin')
      .then((response) => response.json())
      .then((data) => {
        setMessagesToAdmin([...data])

      })
  }, [])

  useEffect(() => {
    messagesToAdmin.map((mes) => {

      if (mes === "") {
        return
      }
      else if (mes.emp.id === currentTeacher.id) {
        setMessagesEmp((prev) => [...prev, mes])
      }


    })
  }, [messagesToAdmin, currentTeacher])


  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم ارسال الرسالة بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'لا يمكن حذف رسالة تم الرد عليها', life: 3000 });
  }
  const showٍServerError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' حدثت مشكلة اثناء تنفيذ العملية ربما فقدنا الاتصال بالانترنت او السيرفر', life: 6000 });
  }



  return (


    <div style={{ marginTop: "1rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>


        <div className="card" style={{ marginTop: "3rem" }} >
          <label for="inputPassword4" className="form-label"> الرسالة  </label>
          <Editor value={text} onTextChange={(e) => setmassage(e.htmlValue.replace(/<[^>]+>/g, ''))} style={{ height: '320px' }} />
        </div>
        <div className="col-12 text-center my-5">
          <Toast ref={toast} />
          <button type="button" className="btn btn-primary " label="Success" severity="success" onClick={() => {



            if (massage === "") {
              showError()

            }

            else {





              fetch("http://localhost:3001/meassgestoadmin", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },

                // assuming you want to send each employee object in the array
                body: JSON.stringify({
                  emp: { name: currentTeacher.name, id: currentTeacher.id },
                  massage: massage,
                  res: ""
                })


              }).then(res => res.text()) // or res.json()
                .then((emp) => {
                  showSuccess()
                  location.reload()
                }).catch((err) => showٍServerError())


            }

          }


          }
          > ارسال الرسالة</button>
        </div>

      </div>

      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          messagesEmp.map((message) => ({
            // key: index,
            name: message.emp.name,
            massage: message.massage,
            res: message.res,
            representative: <>

              <FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faTrash} onClick={(event) => {
                if (message.res === "") {
                  fetch('http://localhost:3001/meassgestoadmin/' + message.id, {
                    method: 'DELETE',
                  })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res)).catch(showٍServerError)
                  event.target.parentNode.parentNode.parentNode.style.display = "none"
                }
                else {
                  showError()
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

export default Messagestoadmin
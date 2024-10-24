import React, { useState, useEffect, useRef } from 'react'
import Nav from '../Nav';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { Editor } from "primereact/editor";


import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import Sidebar from '../Sidebar/Sidebar';

function StudentMessagesToAdmin() {
  // const usernamedata = localStorage.getItem('username')
  // if (usernamedata !== "admin") {

  //   location.assign('/')
  // }
  const [massage, setmassage] = useState();
  const [text, setText] = useState(false);
  const userId = localStorage.getItem('id')
  const [Student, setStudent] = useState([]);
  const [currentStudent, setCurrentStudent] = useState([]);
  const [messagesToAdmin, setMessagesToAdmin] = useState([])
  const [messagesStu, setMessagesStu] = useState([])
  const [Massageres, setMassageres] = useState();
  useEffect(() => {
    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent([...data])
      })
  }, [])




  useEffect(() => {

    Student.map((stu) => {
      if (stu.id === userId) {
        setCurrentStudent(stu)
      }
    })



  }, [Student, userId])




  useEffect(() => {
    fetch('http://localhost:3001/studentMessagesToAdmin')
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
      else if (mes.student.id === currentStudent.id) {
        setMessagesStu((prev) => [...prev, mes])
      }


    })
  }, [messagesToAdmin, currentStudent])


  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم ارسال الرسالة بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي كتابة الرسالة', life: 3000 });
  }
  const showٍServerError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' حدثت مشكلة اثناء تنفيذ العملية ربما فقدنا الاتصال بالانترنت او السيرفر', life: 6000 });
  }



  return (


    <div style={{ marginTop: "3rem", padding: "2rem" }} >
      <div className="card p-fluid container" style={{ padding: "2rem" }}>


        <div className="card" style={{ marginTop: "3rem" }} >
          <label for="inputPassword4" className="form-label"> الرسالة  </label>
          <Editor onTextChange={(e) => setmassage(e.htmlValue)} style={{ height: '320px' }} />
        </div>
        <div className="col-12 text-center my-5">
          <Toast ref={toast} />
          <button type="button" className="btn btn-primary " label="Success" severity="success" onClick={() => {



            if (massage === "" || massage === undefined) {
              showError()

            }

            else {


              fetch("http://localhost:3001/studentMessagesToAdmin", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },

                // assuming you want to send each employee object in the array
                body: JSON.stringify({
                  student: { name: currentStudent.name, id: currentStudent.id },
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
          messagesStu.map((message) => ({
            // key: index,
            name: message.student.name,
            massage: message.massage.replace(/<[^>]+>/g, ''),
            representative: <>

              <button style={{ border: "none", outline: "none", background: "transparent" }} className="edit"
                onClick={() => {
                  setText(true)
                  setmassage(message);

                }}
              ><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></button>


              <div className={text === false ? "modal fade d-none" : "modal fade show "} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div class="modal-dialog" style={{ width: "38%", transform: "translate(20%, 2%)" }}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">رسالة من : {message.student.name}</h5>

                    </div>
                    <div class="modal-body">
                      <h6>الرسالة</h6>
                      <Editor value={message.massage} readOnly style={{ height: '160px' }} />
                    </div>
                    <hr style={{ border: "6px solid" }} />
                    <h6>الرد</h6>
                    <div class="modal-body">

                      <Editor value={message.res} readOnly style={{ height: '160px' }} />


                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                        setText(false)
                      }}>اغلاق</button>
                    </div>


                  </div>
                </div>
              </div>
            </>
          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="massage" header="الرسالة" style={{ width: '25%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="representative" header="الرد" style={{ width: '25%' }} ></Column>
        </DataTable>







      </div>

    </div>

  )
}

export default StudentMessagesToAdmin
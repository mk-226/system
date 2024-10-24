import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Nav from '../Nav';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Editor } from "primereact/editor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'primereact/toast';
import './style.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

function StudentToAdmin() {
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'نجاح', detail: 'تم ارسال الرد', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'يرجي كتابة رد', life: 3000 });
  }
  const showServerError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'حدث خطأ قد يكود فشل الاتصال بالخادم ', life: 3000 });
  }
  // const usernamedata = localStorage.getItem('username')
  // if (usernamedata !== "admin") {

  //   location.assign('/')
  // }
  const [massage, setmassage] = useState([]);
  const [Massageres, setMassageres] = useState();
  const [text, setText] = useState(false);
  const [messagesToAdmin, setMessagesToAdmin] = useState([])


  useEffect(() => {
    fetch('http://localhost:3001/studentMessagesToAdmin')
      .then((response) => response.json())
      .then((data) => {
        setMessagesToAdmin([...data])

      })
  }, [])



  // const Employ = teachers.filter((teacher) => (teacher.username ==="admin" ? "" : { name: teacher.name  , id : teacher.id}));

  return (


    <div style={{ marginTop: "1rem" }} >


      <div className="card" style={{ marginTop: "3rem" }}>


        <DataTable value={
          messagesToAdmin.map((message) => ({
            // key: index,
            code: message.id,
            name: message.student.name,
            massage: message.massage.replace(/<[^>]+>/g, ''),
            res: message.res.replace(/<[^>]+>/g, ''),
            tores: <>

              <button style={{ border: "none", outline: "none", background: "transparent" }} className="edit"
                onClick={() => {
                  setText(true)
                  setmassage(message);

                }}
              ><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faPenToSquare}></FontAwesomeIcon></button>


              <div className={text === false ? "modal fade d-none" : "modal fade show "} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div class="modal-dialog" style={{ width: "40%", transform: "translate(20%, 2%)" }}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">رسالة من : {message.student.name}</h5>

                    </div>
                    <div class="modal-body">
                      <h6>الرسالة</h6>
                      <Editor value={massage.massage} readOnly style={{ height: '160px', backgroundColor: "#e8e8e8" }} />
                    </div>
                    <hr style={{ border: "6px solid" }} />
                    <h6>الرد</h6>
                    <div class="modal-body">
                      {
                        !massage.res ? <Editor readOnly={false} onTextChange={(e) => setMassageres(e.htmlValue)} style={{ height: '160px' }} /> : <Editor value={massage.res} readOnly style={{ height: '160px', backgroundColor: "#e8e8e8" }} />
                      }

                    </div>{
                      massage.res == "" ? <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                          setText(false)
                        }}>اغلاق</button>
                        <Toast ref={toast} />
                        <button type="button" class="btn btn-primary" onClick={() => {
                          console.log(massage);

                          if (Massageres === "") {
                            showError()

                          }
                          else {
                            fetch("http://localhost:3001/studentMessagesToAdmin/" + message.id, {
                              method: "PUT",
                              headers: {
                                'Content-Type': 'application/json'
                              },

                              // assuming you want to send each employee object in the array
                              body: JSON.stringify({
                                student: { name: message.student.name, id: message.student.id },
                                massage: message.massage,
                                res: Massageres
                              })


                            }).then(res => res.text()) // or res.json()
                              .then((emp) => {
                                showSuccess()
                                setTimeout(() => {
                                  location.reload()
                                }, 2000)

                              }).catch((err) => showServerError())


                          }

                        }}

                        >ارسال الرد</button>
                      </div> :
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                            setText(false)
                          }}>اغلاق</button>
                        </div>
                    }

                  </div>
                </div>
              </div>
            </>

          }))

        }
          paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="800px">
          <Column field="name" header="الاسم" style={{ width: '15%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="massage" header="الرسالة" style={{ width: '40%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="res" header="الرد" style={{ width: '35%' }} sortable filter filterPlaceholder="Search"></Column>
          <Column field="tores" header="" style={{ width: '10%' }} ></Column>


        </DataTable>


      </div>

    </div>

  )
}

export default StudentToAdmin
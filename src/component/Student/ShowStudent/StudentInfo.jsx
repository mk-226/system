import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { TabView, TabPanel } from 'primereact/tabview';
import { Knob } from 'primereact/knob';
// import jsPDF from 'jspdf';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
function StudentInfo() {
  const { studentId } = useParams()
  const [students, setStudents] = useState([]);
  const navigate = useNavigate("")

  const userId = localStorage.getItem('id')
  const username = localStorage.getItem('username')
  // if (username !== "admin") {

  //   location.assign('/')
  // }
  useEffect(() => {
    if (studentId === undefined) return


    fetch('http://localhost:3001/Student/' + studentId)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data)
      })


  }, [studentId])
  const [classListData, setclassListData] = useState([]);
  const [studentclass, setStudentclass] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/classList')
      .then((response) => response.json())
      .then((data) => {
        setclassListData([...data])
      })
  }, [])

  useEffect(() => {
    classListData.map((data) => {
      if (data.student.id === studentId) {
        setStudentclass(data)

      }
    })
  }, [classListData, studentId])

  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    classListData.map((data) => {

      if (data.class === studentclass.class && data.semester == studentclass.semester && data.student.id !== studentclass.student.id) {
        setFriendList((prev) => [...prev, data])

      }
    })
  }, [classListData, studentclass])



  return (


    <div class="row gutters-sm">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <img src={students.Gender == "ذكر" || !students.Gender ? "https://bootdey.com/img/Content/avatar/avatar7.png" : "https://cdn3d.iconscout.com/3d/premium/thumb/woman-with-hijab-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wanita-jilbab-girl-lady-stylized-avatar-pack-people-icons-5823033.png"} alt="Admin" class="rounded-circle" width="150" />
              <div class="mt-3">
                <h4>{students.name}</h4>
                {/* <p class="text-secondary mb-1">{students.job}</p> */}
                <p class="text-muted font-size-sm"> كود الطالب : {students.id}</p>

              </div>
            </div>
          </div>
        </div>
        <div class="row gutters-sm">
          <div class="col-sm-12 mb-3">
            <div class="card h-100">
              <div class="card-body">

                {/* <h6 class="d-flex align-items-center mb-3">ايام الغياب  : {nubmerOfAbsent} </h6> */}


                <div className="card flex justify-content-center">
                  {/* <Knob value={nubmerOfAbsent*30/100} min={-50} max={50} /> */}
                </div>

              </div>
            </div>
          </div>
          <div class="col-sm-12 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <h6 class="d-flex align-items-center mb-3"> ساعات التأخير</h6>
                <small> شهر مايو</small>
                <div class="progress mb-3" >
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}>
                    120 دقيقة
                  </div>
                </div>
                <small> شهر يونيو</small>
                <div class="progress mb-3" >
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "18%" }}>
                    115 دقيقة
                  </div>
                </div>
                <small> شهر يوليو</small>
                <div class="progress mb-3" >
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "30%" }}>
                    150 دقيقة
                  </div>
                </div>
                <small> شهر اغسطس</small>
                <div class="progress mb-3" >
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
                    180دقيقة
                  </div>
                </div>
                <small> شهر سبتمبر</small>
                <div class="progress mb-3" >
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}>
                    120 دقيقة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="card col-md-8">
        <TabView>
          <TabPanel header="البيانات الاساسية">
            <p className="m-0">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الاسم </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.name}
                </div>
              </div>

              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الرقم القومي </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.nationalId}
                </div>
              </div>
              <hr />

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">تاريخ الميلاد</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.birthday}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"> الجنسية</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.nationality}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">  النوع</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.Gender}
                </div>
              </div>
              <hr />
            </p>
          </TabPanel>
          <TabPanel header=" بيانات الوالدين">
            <p className="m-0">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الرقم القومي للاب </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.fatherNationalId}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"> هاتف الاب </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.fatherPhone}
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"> وظيفة الاب</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.fatherJob}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"> اسم الام </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.motherName}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">رقم هاتف الام</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.motherPhone}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">رقم القومي الام</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.motherNationalId}
                </div>
              </div>
              <hr />


            </p>
          </TabPanel>
          <TabPanel header="بيانات الاتصال">
            <p className="m-0">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">العنوان</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.address}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الهاتف</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.phone}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">اسم المستخدم</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.username}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">كلمة المرور</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {students.password}
                </div>
              </div>
              <hr />

            </p>
          </TabPanel>
          <TabPanel header=" فصلي">
            <p className="m-0">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الصف</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {studentclass.class}
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">الفصل</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {studentclass.semester}
                </div>
              </div>
              <hr />

              <DataTable value={
                friendList.map((student) => ({
                  // key: index,
                  name: student.student.name,
                  //  nationalId:student.nationalId ,
                  //  fatherPhone:student.fatherPhone ,
                  //  address:student.address ,
                  //  representative : <>
                  //  <div className='d-flex'>
                  //               <a href={"/student-info/"+student.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faEye}></FontAwesomeIcon></a>

                  //        <a><FontAwesomeIcon style={{ margin: "0 0.7rem" , color:"red" }} icon={faTrash} onClick={(event)=>{

                  //            fetch('http://localhost:3001/Student/' + student.id, {
                  //              method: 'DELETE',
                  //            })
                  //            .then(res => res.text()) // or res.json()
                  //            .then()
                  //            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none" 




                  //        }}></FontAwesomeIcon></a>
                  //        <NavLink className="edit" to={"/edit-student/"+student.id}><FontAwesomeIcon style={{ margin: "0 0.7rem" }} icon={faPenToSquare}></FontAwesomeIcon></NavLink>
                  //        </div>
                  //  </>
                }))

              }
                paginator rows={10} rowsPerPageOptions={[10, 25, 50]} scrollable scrollHeight="800px">
                <Column field="name" header="الاسم" style={{ width: '100%' }} sortable filter filterPlaceholder="Search"></Column>
                <Column field="representative" header="" style={{ width: '25%' }} ></Column>
              </DataTable>


            </p>
          </TabPanel>
          {/* <TabPanel header="الرسائل و التكليفات ">
                    <p className="m-0">
                    <h5>عدد الرسائل  :<span style={{padding:"0.2rem 0.5rem" , backgroundColor:"#92bfffdd" , borderRadius : "5px" , marginRight:"0.5rem"}}>{lengthOfData}</span></h5>
                      {
                        employeMessage.map((mes) =>
                          <>
                          
                           <Panel header={"الرسالة : "} toggleable collapsed  style={{marginTop:"2rem"}}>
                            <p className="m-0">
                            <Editor
                            readOnly
                                   
                                    value={mes.massage}
                                    // onTextChange={(e) => mes.res = e.htmlValue.replace(/<[^>]+>/g, '')}
                                    style={{ height: '180px' , marginBottom:"1rem"  }}
                                  />
                            {mes.res === 
                            "" && userid == mes.emp.id ? (
                              <>
                              <h4> الرد :</h4>
                                 <Editor
                                    
                                    value={mes.res}
                                    onTextChange={(e) => mes.res = e.htmlValue.replace(/<[^>]+>/g, '')}
                                    rows={5}
                                    cols={5}
                                    style={{ height: '120px' , marginBottom:"1rem"  }}
                                  />
                                
                                  <button style={{width:"100%",marginTop:"1rem", backgroundColor:"transparent" , border:"none" , textAlign:"left"}}
                                  onClick={
      
                                    () => {
                                      
                                    fetch("http://localhost:3001/messages/" + mes.id , {
                                      method: "PUT",
                                      headers: {
                                        'Content-Type': 'application/json'
                                      },
                                
                                        // assuming you want to send each employee object in the array
                                        body: JSON.stringify({
                                          emp :{name:students.name , id : teacherId}, 
                                          massage:mes.massage ,
                                          res : mes.res
                                        })
                                      
                                    
                                    })
                                    playSound()
                                    setTimeout(()=>{
                                      location.assign("/teacher-info/" +teacherId)
                                    },1300)
                                  
                                    
                                  }}
                                  ><span style={{ color:"green" , fontSize: "1.5rem" , textAlign :"left"}} className="pi pi-send"></span></button>
                            </>
                            ) : (
                              <Editor 
                                readOnly={true}
                                style={{ height: '100px', textAlign: "start" , backgroundColor:"#eaebeb"}}
                                value={mes.res}
                                rows={5}
                                cols={5}
                              />

                            )}
                            </p>
              
                           </Panel>
                           <hr style={{border:"3px solid" , color: " #00b7ff #00b7ffd"}} >
                           </hr>
                          </>
                         
                        )
                      }
                     
                  
                  <hr/>

                    </p>
                </TabPanel> */}
        </TabView>
        {
          username === "admin" ? <div className="row" style={{ marginBottom: "2rem" }}>
            <div className="col-sm-12 text-center">
              <button className="btn btn-info " style={{ fontSize: "1.3rem" }} onClick={() => {

                navigate("/edit-student/" + studentId)

              }


              }> تعديل البيانات</button>
            </div>
          </div> : ""
        }

      </div>


    </div>


  )
}

export default StudentInfo
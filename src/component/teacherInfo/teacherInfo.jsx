import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Editor } from "primereact/editor";
import { TabView, TabPanel } from 'primereact/tabview';
import { Knob } from 'primereact/knob';
// import jsPDF from 'jspdf';
import { Panel } from 'primereact/panel';



// css file
import 'primeicons/primeicons.css';
import './style.css'




function TeacherInfo() {





  const userid = localStorage.getItem('id')
  const [teachers, setTeachers] = useState([]);
  const { teacherId } = useParams()
  const navigate = useNavigate("")

  const username = localStorage.getItem('username')
  if (username !== "admin") {

    location.assign('/')
  }
  useEffect(() => {
    if (teacherId === undefined) return


    fetch('http://localhost:3001/teacher/' + teacherId)
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data)
      })


  }, [teacherId])

  const [nubmerOfAbsent, setNubmerOfAbsent] = useState([]);
  const [absentEmpData, setAbsentEmpData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/absentEmploy')
      .then((response) => response.json())
      .then((data) => {
        setAbsentEmpData([...data])


      })
  }, [])

  let counterAbsent = 0
  absentEmpData.map((emp) => {

    if (emp.emp.id == teacherId) {
      setAbsentEmpData(absentEmpData.filter(emp => emp.emp.id !== teacherId))
      counterAbsent++
      setNubmerOfAbsent(counterAbsent);


    }
    console.log(nubmerOfAbsent);


  })


  const [MessgesData, setMessgesData] = useState([]);
  const [employeMessage, setEmployeMessage] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then((response) => response.json())
      .then((data) => {
        setMessgesData([...data])

      })
  }, [])

  let counterMessage = 0
  const [lengthOfData, setlengthOfData] = useState([]);
  MessgesData.map((emp) => {

    if (emp.emp.id == teacherId) {
      setMessgesData(MessgesData.filter(emp => emp.emp.id !== teacherId))
      setEmployeMessage((prevMessages) => [...prevMessages, emp])
      counterMessage++
      setlengthOfData(counterMessage);

    }


  })




  return (
    <>





      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src={teachers.Gender == "ذكر" || !teachers.Gender ? "https://bootdey.com/img/Content/avatar/avatar7.png" : "https://cdn3d.iconscout.com/3d/premium/thumb/woman-with-hijab-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wanita-jilbab-girl-lady-stylized-avatar-pack-people-icons-5823033.png"} alt="Admin" class="rounded-circle" width="150" />
                <div class="mt-3">
                  <h4>{teachers.name}</h4>
                  <p class="text-secondary mb-1">{teachers.job}</p>
                  <p class="text-muted font-size-sm"> كود الموظف : {teachers.id}</p>

                </div>
              </div>
            </div>
          </div>
          <div class="row gutters-sm">
            <div class="col-sm-12 mb-3">
              <div class="card h-100">
                <div class="card-body">

                  <h6 class="d-flex align-items-center mb-3">ايام الغياب  : {nubmerOfAbsent} </h6>


                  <div className="card flex justify-content-center">
                    <Knob value={nubmerOfAbsent * 30 / 100} min={-50} max={50} />
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
                    {teachers.name}
                  </div>
                </div>

                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">الرقم القومي </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.nationalId}
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">تاريخ الميلاد</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.birthday}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0"> الجنسية</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.nationality}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">  النوع</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.Gender}
                  </div>
                </div>
                <hr />
              </p>
            </TabPanel>
            <TabPanel header="البيانات الوظيفية">
              <p className="m-0">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">الوظيفة </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.job}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">الوصف الوظيفي </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.jobInfo}
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0"> القسم</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.section}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0"> مادة التدريس</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.subject}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">المؤهل</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.qualification}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">جهة المؤهل</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.University}
                  </div>

                </div>

                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">سنة المؤهل</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.gYear}
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
                    {teachers.address}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">الهاتف</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.number}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">اسم المستخدم</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.username}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">كلمة المرور</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {teachers.password}
                  </div>
                </div>
                <hr />

              </p>
            </TabPanel>
            <TabPanel header="الرسائل و التكليفات ">
              <p className="m-0">
                <h5>عدد الرسائل  :<span style={{ padding: "0.2rem 0.5rem", backgroundColor: "#92bfffdd", borderRadius: "5px", marginRight: "0.5rem" }}>{lengthOfData}</span></h5>
                {
                  employeMessage.map((mes) =>
                    <>

                      <Panel header={"الرسالة : "} toggleable collapsed style={{ marginTop: "2rem" }}>
                        <p className="m-0">
                          <Editor
                            readOnly

                            value={mes.massage}
                            // onTextChange={(e) => mes.res = e.htmlValue.replace(/<[^>]+>/g, '')}
                            style={{ height: '180px', marginBottom: "1rem" }}
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
                                style={{ height: '120px', marginBottom: "1rem" }}
                              />

                              <button style={{ width: "100%", marginTop: "1rem", backgroundColor: "transparent", border: "none", textAlign: "left" }}
                                onClick={

                                  () => {

                                    fetch("http://localhost:3001/messages/" + mes.id, {
                                      method: "PUT",
                                      headers: {
                                        'Content-Type': 'application/json'
                                      },

                                      // assuming you want to send each employee object in the array
                                      body: JSON.stringify({
                                        emp: { name: teachers.name, id: teacherId },
                                        massage: mes.massage,
                                        res: mes.res
                                      })


                                    })
                                    playSound()
                                    setTimeout(() => {
                                      location.assign("/teacher-info/" + teacherId)
                                    }, 1300)


                                  }}
                              ><span style={{ color: "green", fontSize: "1.5rem", textAlign: "left" }} className="pi pi-send"></span></button>
                            </>
                          ) : (
                            <Editor
                              readOnly={true}
                              style={{ height: '100px', textAlign: "start", backgroundColor: "#eaebeb" }}
                              value={mes.res}
                              rows={5}
                              cols={5}
                            />

                          )}
                        </p>

                      </Panel>
                      <hr style={{ border: "3px solid", color: " #00b7ff #00b7ffd" }} >
                      </hr>
                    </>

                  )
                }


                <hr />

              </p>
            </TabPanel>
          </TabView>
          <div className="row" style={{ marginBottom: "2rem" }}>
            <div className="col-sm-12 text-center">
              <button className="btn btn-info " style={{ fontSize: "1.3rem" }} onClick={() => {

                navigate("/teacher-edit/" + teacherId)

              }


              }> تعديل البيانات</button>
            </div>
          </div>
        </div>


      </div>



    </>
  )
}

export default TeacherInfo
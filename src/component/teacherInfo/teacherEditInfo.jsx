import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

// import jsPDF from 'jspdf';

function TeacherEditInfo() {


  const [teachers, setTeachers] = useState([]);
  const { teacherId } = useParams()
  const navigate = useNavigate("")
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'يرجي ادخال الموظف و التكليف', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'لا يمكن حذف رسالة تم الرد عليها    ', life: 3000 });
  }
  useEffect(() => {
    if (teacherId === undefined) return


    fetch('http://localhost:3001/teacher/' + teacherId)
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data)
        setName(data.name)
        setNationalId(data.nationalId);
        setAddress(data.address);
        setGYear(data.gYear);
        setQualification(data.qualification);
        setNumber(data.number);
        setJob(data.job);
        setJobInfo(data.jobInfo);
        setUniversity(data.university);
        setGender(data.Gender);
        setSection(data.section);
        setNationality(data.nationality);
        setSubject(data.subject);
        setbirthday(data.birthday);
        setusername(data.username);
        setpassword(data.password);

      })



  }, [teacherId])

  const [name, setName] = useState();
  const [nationalId, setNationalId] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [job, setJob] = useState();
  const [jobInfo, setJobInfo] = useState();
  const [gYear, setGYear] = useState();
  const [qualification, setQualification] = useState();
  const [University, setUniversity] = useState();
  const [section, setSection] = useState("");
  const [nationality, setNationality] = useState("");
  const [Gender, setGender] = useState("");
  const [subject, setSubject] = useState("");
  const [birthday, setbirthday] = useState("");
  const [username, setusername] = useState()
  const [password, setpassword] = useState()
  return (
    <>



      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={teachers.Gender == "ذكر" || !teachers.Gender ? "https://bootdey.com/img/Content/avatar/avatar7.png" : "https://cdn3d.iconscout.com/3d/premium/thumb/woman-with-hijab-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wanita-jilbab-girl-lady-stylized-avatar-pack-people-icons-5823033.png"} alt="Admin" class="rounded-circle" width="150" />

                <div className="mt-3">
                  <p className="text-secondary mb-1">{teachers.name}</p>
                  <p className="text-secondary mb-1">{teachers.job}</p>
                  <p className="text-muted font-size-sm">{teachers.address}</p>

                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">

              <form className="row g-3" style={{ backgroundColor: "#dee2e6a3", borderRadius: "10px", margin: "auto", fontSize: "1.2rem" }}>
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">اسم المعلم</label>
                  <input type="text" className="form-control" id="fname" defaultValue={teachers.name} onInput={(e) => {
                    setName(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">الرقم القومي</label>
                  <input type="number" className="form-control" id="inputPassword4" defaultValue={teachers.nationalId} onInput={(e) => {
                    setNationalId(e.target.value)
                  }} />
                </div>
                <div className="col-md-6" style={{ display: "flex", flexDirection: "column" }}>
                  <label for="inputPassword4" className="form-label">تاريخ الميلاد </label>
                  <Calendar
                    className='form-control' defaultValue={teachers.birthday} onChange={(e) => {

                      setbirthday(e.target.value)
                    }} />
                </div>
                <div className="col-md-6">
                  <label for="inputAddress" className="form-label">العنوان</label>
                  <input type="text" className="form-control" id="inputAddress" defaultValue={teachers.address} onInput={(e) => {
                    setAddress(e.target.value)
                  }} />
                </div>
                <div className="col-6">
                  <label for="inputAddress2" className="form-label">رقم الهاتف</label>
                  <input type="text" className="form-control" id="inputAddress2" defaultValue={teachers.number} onInput={(e) => {
                    setNumber(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">الوظيفة</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.job} onChange={(event) => {

                    setJob(event.target.value);

                  }}>
                    <option >اختر...</option>
                    <option>معلم</option>
                    <option>مسئول شئون عاملين</option>
                    <option>It</option>
                    <option>اخصائي اجتماعي</option>
                    <option> امن</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">الوصف الوظيفي</label>
                  <textarea className="form-control" cols="1" rows="1" name="" id="" defaultValue={teachers.jobInfo} onChange={(event) => {

                    setJobInfo(event.target.value);

                  }}></textarea>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">القسم</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.section} onChange={(event) => {

                    setSection(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option>اللغة العربية</option>
                    <option>اللغة الانجليزية  </option>
                    <option>العلوم</option>
                    <option>الدراسات الاجتماعية </option>
                    <option> الرياضيات</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">مادة التدريس</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.subject} onChange={(event) => {

                    setSubject(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option>اللغة العربية</option>
                    <option>اللغة الانجليزية  </option>
                    <option>العلوم</option>
                    <option>الدراسات الاجتماعية </option>
                    <option> الرياضيات</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label" defaultValue={teachers.nationality} >الجنسية</label>
                  <select id="inputState" className="form-select" onChange={(event) => {

                    setNationality(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option>مصري</option>
                    <option> فلسطيني </option>
                    <option>سوري</option>
                    <option>سعودي </option>
                    <option> اماراتي</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">النوع</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.Gender} onChange={(event) => {

                    setGender(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option>ذكر</option>
                    <option>انثي  </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputState" className="form-label">المؤهل</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.qualification} onChange={(event) => {

                    setQualification(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option>بكالوريوس هندسة</option>
                    <option>بكالوريوس تربية</option>
                    <option>بكالوريوس علوم</option>
                    <option>ليسانس اداب</option>
                    <option>ليسانس خدمة اجتماعية</option>
                    <option>دبلوم</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputState" className="form-label">جهة المؤهل</label>
                  <select id="inputState" className="form-select" defaultValue={teachers.university} onChange={(event) => {

                    setUniversity(event.target.value);

                  }}>
                    <option selected>اختر...</option>
                    <option> جامعة القاهرة</option>
                    <option>جامعة الفيوم </option>
                    <option> جامعة عين شمس</option>
                    <option> جامعة بني سويف</option>
                    <option> جامعة حلوان </option>
                    <option>جامعة المنيا</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputState" className="form-label">سنة المؤهل</label>
                  <input type="number" className="form-control" id="inputPassword4" defaultValue={teachers.gYear} onInput={(e) => {
                    setGYear(e.target.value)
                  }} />
                </div>
                <div className="col-12 text-center my-5">
                  <Toast ref={toast} />
                  <button type="button" className="btn btn-info " onClick={() => {

                    fetch("http://localhost:3001/teacher/" + teacherId, {
                      method: "PUT",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        name,
                        nationalId,
                        address,
                        gYear,
                        qualification,
                        number,
                        job,
                        University,
                        jobInfo,
                        birthday,
                        section,
                        nationality,
                        Gender,
                        subject,
                        username,
                        password
                      })

                    })
                      .then(response => response.json())
                      .then(data => {
                        showSuccess()
                        location.reload()
                      }).catch((err) => showError())


                  }


                  }>حفظ التعديلات</button>
                </div>
              </form>


            </div>
          </div>





        </div>
      </div>



    </>
  )
}

export default TeacherEditInfo
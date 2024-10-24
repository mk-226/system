import React, { useState, useEffect, useRef } from 'react'
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Toast } from 'primereact/toast';
// import './'
import './style.css'







function Teacher() {
  const [name, setName] = useState();
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [job, setJob] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [gYear, setGYear] = useState("");
  const [qualification, setQualification] = useState("");
  const [University, setUniversity] = useState("");
  const [section, setSection] = useState("");
  const [nationality, setNationality] = useState("");
  const [Gender, setGender] = useState("");
  const [subject, setSubject] = useState("");
  const [birthday, setbirthday] = useState("");
  // const [imgProfile, setImgProfile] = useState("");
  const [username, setusername] = useState()
  const [password, setpassword] = useState()
  const [teachers, setTeachers] = useState([]);

  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: ' تم اضافة المعلم بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'حدث خطأ غير معروف', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي ملئ جميع الحقول ', life: 3000 });
  }

  const usernamedata = localStorage.getItem('username')
  if (usernamedata !== "admin") {

    location.assign('/')
  }
  useEffect(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 6;
    let passwordGenrate = '';

    for (let i = 0; i < passwordLength; i++) {
      passwordGenrate += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setpassword(passwordGenrate)

  }, [])






  const navigate = useNavigate("")
  useEffect(() => {


    fetch('http://localhost:3001/teacher')
      .then((response) => response.json())
      .then((data) => {
        setTeachers([...data])
      })



  }, [])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }


  return (
    <>



      <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>

        <div className='form-container w-100'>

          <form className="row g-3" style={{ backgroundColor: "#dee2e6a3", borderRadius: "10px" }}>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">اسم المعلم</label>
              <input type="text" className="form-control" id="fname" onInput={(e) => {
                setName(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">الرقم القومي</label>
              <input type="number" className="form-control" id="inputPassword4" onInput={(e) => {
                setNationalId(e.target.value)
                setusername(e.target.value)
              }} />
            </div>
            <div className="col-md-6" style={{ display: "flex", flexDirection: "column" }}>
              <label for="inputPassword4" className="form-label">تاريخ الميلاد </label>
              <Calendar className='form-control' onChange={(e) => {

                setbirthday(formatDate(e.target.value.toString()))
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputAddress" className="form-label">العنوان</label>
              <input type="text" className="form-control" id="inputAddress" onInput={(e) => {
                setAddress(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputAddress2" className="form-label">رقم الهاتف</label>
              <input type="text" className="form-control" id="inputAddress2" onInput={(e) => {
                setNumber(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">الوظيفة</label>
              <select id="inputState" className="form-select" onChange={(event) => {

                setJob(event.target.value);

              }}>
                <option selected>اختر...</option>
                <option>معلم</option>
                <option>مسئول شئون عاملين</option>
                <option>It</option>
                <option>اخصائي اجتماعي</option>
                <option> امن</option>
              </select>
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">الوصف الوظيفي</label>
              <textarea className="form-control" cols="1" rows="1" name="" id="" onChange={(event) => {

                setJobInfo(event.target.value);

              }}></textarea>
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">القسم</label>
              <select id="inputState" className="form-select" onChange={(event) => {

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
              <select id="inputState" className="form-select" onChange={(event) => {

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
              <label for="inputCity" className="form-label">الجنسية</label>
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
              <select id="inputState" className="form-select" onChange={(event) => {

                setGender(event.target.value);

              }}>
                <option selected>اختر...</option>
                <option>ذكر</option>
                <option>انثي  </option>
              </select>
            </div>
            <div className="col-md-6">
              <label for="inputState" className="form-label">المؤهل</label>
              <select id="inputState" className="form-select" onChange={(event) => {

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
              <select id="inputState" className="form-select" onChange={(event) => {

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
              <input type="number" className="form-control" id="inputPassword4" onInput={(e) => {
                setGYear(e.target.value)
              }} />
            </div>
            <div className="col-12 text-center my-5">
              <Toast ref={toast} />
              <button type="button" className="btn btn-primary " onClick={() => {


                console.log(password);

                const existingTeacher = teachers.find((teacher) => teacher.nationalId === nationalId);
                if (existingTeacher) {
                  alert("الرقم القومي مستخدم من قبل")
                }

                if (name && nationalId && address && gYear && qualification && number && job && !existingTeacher) {

                  fetch("http://localhost:3001/teacher", {
                    method: "POST",
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
                      subject,
                      section,
                      nationality,
                      Gender,
                      username,
                      password

                    })
                  }).then((data) => {
                    showSuccess()
                    location.reload()
                  }).catch((err) => showError())

                } else {
                  showDeleteError()
                }


              }}>اضافة معلم </button>


              <button type="reset" className="btn btn-danger  " style={{ marginRight: "0.5rem" }}> اعادة تعيين </button>

            </div>
          </form>

        </div>
      </div>


    </>
  )
}

export default Teacher
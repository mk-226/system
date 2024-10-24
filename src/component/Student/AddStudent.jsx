
import React, { useState, useEffect, useRef } from 'react'
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Toast } from 'primereact/toast';

function AddStudent() {
  const [Student, setStudent] = useState([])
  const [name, setName] = useState();
  const [nationalId, setNationalId] = useState("");
  const [birthday, setbirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [Gender, setGender] = useState("");
  const [fatherNationalId, setFatherNationalId] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [fatherJob, setFatherJob] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [motherNationalId, setMotherNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState()
  const [password, setpassword] = useState()


  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'تم اضافة الطالب بنجاح', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'حدث خطأ غير معروف قد يكون تعذر الاتصال بالسيرفر', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي ملئ جميع الحقول ', life: 3000 });
  }
  const showIDError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' الرقم القومي مسجل من قبل', life: 3000 });
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
  useEffect(() => {
    const characters = '0123456789';
    const userNameLength = 6;
    let userNameGenrate = '';

    for (let i = 0; i < userNameLength; i++) {
      userNameGenrate += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setusername(userNameGenrate)

  }, [])

  useEffect(() => {


    fetch('http://localhost:3001/Student')
      .then((response) => response.json())
      .then((data) => {
        setStudent([...data])
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

          <form className="row g-3" style={{ backgroundColor: "#dee2e6a3", borderRadius: "10px", marginBottom: "3rem" }}>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">اسم الطالب</label>
              <input type="text" className="form-control" id="fname" onInput={(e) => {
                setName(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">الرقم القومي</label>
              <input type="number" className="form-control" id="inputPassword4" onInput={(e) => {
                setNationalId(e.target.value)

              }} />
            </div>

            <div className="col-md-12">
              <label for="inputAddress" className="form-label">العنوان</label>
              <input type="text" className="form-control" id="inputAddress" onInput={(e) => {
                setAddress(e.target.value)
              }} />
            </div>
            <div className="col-md-6" style={{ display: "flex", flexDirection: "column" }}>
              <label for="inputPassword4" className="form-label">تاريخ الميلاد </label>
              <Calendar className='form-control' onChange={(e) => {

                //   setbirthday(e.target.value)
                setbirthday(formatDate(e.target.value.toString()))
              }} />
            </div>
            <div className="col-6">
              <label for="inputAddress2" className="form-label">رقم الهاتف</label>
              <input type="number" className="form-control" id="inputAddress2" onInput={(e) => {
                setphone(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">الرقم القومي للاب</label>
              <input type="number" className="form-control" id="inputAddress2" onInput={(e) => {
                setFatherNationalId(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label"> هاتف الاب</label>
              <input className="form-control" cols="1" rows="1" name="" id="" onChange={(event) => {

                setFatherPhone(event.target.value);

              }}></input>
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">وظيفة الاب</label>
              <input type="text" className="form-control" id="inputAddress2" onInput={(e) => {
                setFatherJob(e.target.value)
              }} />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">اسم الام </label>
              <input type="text" className="form-control" id="inputAddress2" onInput={(e) => {
                setMotherName(e.target.value)
              }} />
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
              <label for="inputState" className="form-label">هاتف الام</label>
              <input type="number" className="form-control" id="inputAddress2" onInput={(e) => {
                setMotherPhone(e.target.value)
              }} />
            </div>

            <div className="col-md-6">
              <label for="inputState" className="form-label">الرقم القومي للام </label>
              <input type="number" className="form-control" id="inputPassword4" onInput={(e) => {
                setMotherNationalId(e.target.value)
              }} />
            </div>
            <div className="col-12 text-center my-5">
              <Toast ref={toast} />
              <button type="button" className="btn btn-primary " onClick={() => {


                const existingTeacher = Student.find((stu) => stu.nationalId === nationalId);
                if (existingTeacher) {
                  showIDError()
                }

                if (name && nationalId && birthday && nationality && Gender && phone && fatherNationalId && fatherPhone && address && !existingTeacher) {

                  fetch("http://localhost:3001/Student", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      name,
                      nationalId,
                      address,
                      birthday,
                      nationality,
                      Gender,
                      fatherNationalId,
                      fatherPhone,
                      fatherJob,
                      motherName,
                      motherPhone,
                      motherNationalId,
                      phone,
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


              }}>اضافة طالب جديد </button>


              <button type="reset" className="btn btn-danger  " style={{ marginRight: "0.5rem" }}> اعادة تعيين </button>

            </div>
          </form>

        </div>
      </div>


    </>
  )
}

export default AddStudent
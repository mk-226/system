import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

// import jsPDF from 'jspdf';

function StudentEditInfo() {


  const [student, setStudent] = useState([]);
  const { studentId } = useParams()
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: ' تم تعديل البيانات', life: 3000 });
  }
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'حدث خطأ غير معروف قد يكون تعذر الاتصال بالسيرفر', life: 3000 });
  }
  const showDeleteError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: ' يرجي ملئ جميع الحقول ', life: 3000 });
  }
  useEffect(() => {
    if (studentId === undefined) return


    fetch('http://localhost:3001/Student/' + studentId)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data)
        setName(data.name)
        setNationalId(data.nationalId);
        setbirthday(data.birthday);
        setNationality(data.nationality);
        setGender(data.Gender);
        setFatherNationalId(data.nationality);
        setNationality(data.fatherNationalId);
        setFatherPhone(data.fatherPhone);
        setFatherJob(data.fatherJob);
        setMotherName(data.motherName);
        setMotherPhone(data.motherPhone);
        setMotherNationalId(data.motherNationalId)
        setAddress(data.address);
        setphone(data.phone);
        setusername(data.username);
        setpassword(data.password);

      })



  }, [studentId])

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
  return (
    <>



      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={student.Gender == "ذكر" || !student.Gender ? "https://bootdey.com/img/Content/avatar/avatar7.png" : "https://cdn3d.iconscout.com/3d/premium/thumb/woman-with-hijab-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wanita-jilbab-girl-lady-stylized-avatar-pack-people-icons-5823033.png"} alt="Admin" class="rounded-circle" width="150" />

                <div className="mt-3">
                  <p className="text-secondary mb-1">{student.name}</p>
                  <p className="text-secondary mb-1">كود الطالب :  {student.id}</p>
                  <p className="text-muted font-size-sm">{student.address}</p>

                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">

              <form className="row g-3" style={{ backgroundColor: "#dee2e6a3", borderRadius: "10px" }}>
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">اسم الطالب</label>
                  <input type="text" defaultValue={student.name} className="form-control" id="fname" onInput={(e) => {
                    setName(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label">الرقم القومي</label>
                  <input type="number" defaultValue={student.nationalId} className="form-control" id="inputPassword4" onInput={(e) => {
                    setNationalId(e.target.value)

                  }} />
                </div>
                <div className="col-md-6" style={{ display: "flex", flexDirection: "column" }}>
                  <label for="inputPassword4" className="form-label">تاريخ الميلاد </label>
                  <Calendar defaultValue={student.birthday} className='form-control' onChange={(e) => {

                    //   setbirthday(e.target.value)
                    setbirthday(formatDate(e.target.value.toString()))
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputAddress" className="form-label">العنوان</label>
                  <input type="text" defaultValue={student.address} className="form-control" id="inputAddress" onInput={(e) => {
                    setAddress(e.target.value)
                  }} />
                </div>
                <div className="col-6">
                  <label for="inputAddress2" className="form-label">رقم الهاتف</label>
                  <input type="number" defaultValue={student.phone} className="form-control" id="inputAddress2" onInput={(e) => {
                    setphone(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">الرقم القومي للاب</label>
                  <input type="number" defaultValue={student.fatherNationalId} className="form-control" id="inputAddress2" onInput={(e) => {
                    setFatherNationalId(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label"> هاتف الاب</label>
                  <input defaultValue={student.fatherPhone} className="form-control" cols="1" rows="1" name="" id="" onChange={(event) => {

                    setFatherPhone(event.target.value);

                  }}></input>
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">وظيفة الاب</label>
                  <input type="text" defaultValue={student.fatherJob} className="form-control" id="inputAddress2" onInput={(e) => {
                    setFatherJob(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">اسم الام </label>
                  <input type="text" defaultValue={student.motherName} className="form-control" id="inputAddress2" onInput={(e) => {
                    setMotherName(e.target.value)
                  }} />
                </div>
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">الجنسية</label>
                  <select id="inputState" className="form-select" onChange={(event) => {

                    setNationality(event.target.value);

                  }}>
                    {/* <option selected>{student.nationality}</option> */}
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
                  <input type="number" defaultValue={student.motherPhone} className="form-control" id="inputAddress2" onInput={(e) => {
                    setMotherPhone(e.target.value)
                  }} />
                </div>

                <div className="col-md-6">
                  <label for="inputState" className="form-label">الرقم القومي للام </label>
                  <input type="number" className="form-control" defaultValue={student.motherNationalId} id="inputPassword4" onInput={(e) => {
                    setMotherNationalId(e.target.value)
                  }} />
                </div>
                <div className="col-12 text-center my-5">
                  <Toast ref={toast} />
                  <button type="button" className="btn btn-info " onClick={() => {



                    if (name && nationalId && birthday && nationality && Gender && phone && fatherNationalId && fatherPhone && address) {

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
                          password,
                          type: "student"

                        })
                      }).then((data) => {
                        showSuccess()
                        location.reload()
                      }).catch((err) => showError())

                    } else {
                      showDeleteError()
                    }


                  }}>  حفظ التعديلات </button>




                </div>
              </form>


            </div>
          </div>





        </div>
      </div>



    </>
  )
}

export default StudentEditInfo
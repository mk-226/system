
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import logo from '../../assets/logo.jpg';


function Login() {
    const [teacher, setTeacher] = useState([]);
    const [userData, setUserData] = useState()
    const [studentData, setStudentData] = useState()

    const [student, setStudent] = useState([])
    useEffect(() => {

        fetch('http://localhost:3001/Student')
            .then((response) => response.json())
            .then((data) => {
                setStudent(data)
            })


    }, [])


    const navigate = useNavigate("")
    useEffect(() => {


        fetch('http://localhost:3001/teacher/')
            .then((response) => response.json())
            .then((data) => {
                setTeacher(data)
            })


    }, [])


    const [userName, setUserName] = useState()
    const [userPassword, setUserPassword] = useState()

    return (
        <>
            <div className="col-lg-6 col-12 mx-auto" style={{ marginTop: "15%" }}>
                <div class="text-center image-size-small position-relative">
                    <img src="https://annedece.sirv.com/Images/user-vector.jpg" class="rounded-circle p-2 bg-white" />
                    <div class="icon-camera">
                        <a href="" class="text-primary"><i class="lni lni-camera"></i></a>
                    </div>
                </div>
                <div class="p-5 bg-white rounded shadow-lg">
                    <h3 class="mb-2 text-center pt-5"> يرجي تسجيل الدخول</h3>

                    <form>
                        <label class="font-500">اسم امستخدم</label>
                        <input name="" class="form-control form-control-lg mb-3" type="text" onChange={(e) => {
                            {
                                teacher.map((teachers) => {
                                    if (teachers.username === e.target.value) {
                                        // localStorage.setItem('users',e.target.value);
                                        setUserName(e.target.value)
                                        setUserData(teachers)
                                    }
                                })
                            }
                            {
                                student.map((stu) => {
                                    if (stu.username === e.target.value) {
                                        // localStorage.setItem('users',e.target.value);
                                        setUserName(e.target.value)
                                        setUserData(stu)
                                    }
                                })
                            }

                        }} />
                        <label class="font-500">كلمة المرور</label>
                        <input name="" class="form-control form-control-lg" type="password" onChange={(e) => {

                            {
                                // teacher.map((teacher)=>{

                                if (userData.password === e.target.value) {

                                    setUserPassword(userData.password)

                                }

                                // })


                            }
                            {
                                // teacher.map((teacher)=>{

                                if (userData.password === e.target.value) {

                                    setUserPassword(userData.password)

                                }

                                // })


                            }

                        }} />

                        <button type='button' class="btn btn-primary btn-lg w-100 shadow-lg" style={{ marginTop: "2rem" }}
                            onClick={() => {


                                localStorage.setItem('users', userData.name);
                                localStorage.setItem('username', userData.username);
                                localStorage.setItem('id', userData.id);
                                localStorage.setItem('type', userData.type);

                                if (userName && userPassword) {


                                    navigate(`/`)

                                }
                                else {
                                    alert('الرجاء ادخال البيانات بشكل صحيح')
                                }

                            }}> تسجيل الدخول</button>
                    </form>

                </div>
            </div>
            <div >


                {/* <form>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            
            onChange={(e) =>{
                {
                     teacher.map((teachers)=>{
                        if (teachers.username === e.target.value) {
                            // localStorage.setItem('users',e.target.value);
                            setUserName(e.target.value)
                            setUserData(teachers)
                        }
                     })
                }
               
            }}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            
             
            onChange={(e) =>{

                {
                    // teacher.map((teacher)=>{

                        if (userData.password === e.target.value) {

                        setUserPassword(userData.password )
                       
                    }

                    // })
                    
                   
                }
               
            }}
            />
        </div>
     
        <button type="button" className="btn btn-primary"
        onClick={() =>{
          
            
         localStorage.setItem('users', userData.name);
         localStorage.setItem('username', userData.username);
         localStorage.setItem('id', userData.id);
            
         if (userName && userPassword) {
           

             navigate(`/`)
            
         }
         else{
             alert('الرجاء ادخال البيانات بشكل صحيح')
         }
           
        }}
        >Submit</button>
    </form> */}
            </div>
        </>

    )
}

export default Login 

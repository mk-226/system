import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../../pages/HomePage";
import TeacherPage from "../../../pages/TeacherPage";
import ShowTeacherPage from "../../../pages/ShowTeachersPage";
import TeacherInfoPage from "../../../pages/TeacherInfoPage";
import TeacherEditInfoPage from "../../../pages/TeacherEditInfoPage";
import AbsentPage from "../../../pages/AbsentPage";
import MassagesPage from "../../../pages/MassagesPage";
import UsersPage from "../../../pages/LoginPage";
import AttendancePage from "../../../pages/AttendancePage";
import AttendanceAdminPage from "../../../pages/AttendanceAdminPage";
import TimetablePage from "../../../pages/TimetablePage";
import TeacherTimeTablePage from "../../../pages/TeacherTimeTablePage";
import MessagesToAdminPage from "../../../pages/MessagesToAdminPage";
import EmpMessagesPage from "../../../pages/EmpMessagesPage";
import ShowStudentPage from "../../../pages/Student/ShowStudentPage";
import StudentInfoPage from "../../../pages/Student/StudentInfoPage";
import AddStudentPage from "../../../pages/Student/AddStudentPage";
import StudentEditInfoPage from "../../../pages/Student/StudentEditInfoPage";
import ClassListPage from "../../../pages/Student/ClassListPage";
import StudentTimeTablePage from "../../../pages/Student/StudentTimeTablePage";
import StudentMessagesToAdminPage from "../../../pages/Student/StudentMessagesToAdminPage";
import MessagesFromStudentToAdmin from "../../../pages/MessagesFromStudentToAdmin";
import MyStudentsPage from "../../../pages/MyStudentsPage";
import HomeWorkPage from "../../../pages/HomeWorkPage";
import MyHomeWorkPage from "../../../pages/Student/MyHomeWorkPage";
import UserInfoPage from "../../../pages/UserInfoPage";
import NotFoundPage from "../../../pages/NotFoundPage";



const router = createBrowserRouter(
     [
        { path: "/", 
            element:<HomePage/>,
            errorElement :<NotFoundPage/>
        },
        { path: "/teacher", 
            element:<TeacherPage/>
        },
        { path: "/show-teacher", 
            element:<ShowTeacherPage/>
        },
        { path: "/teacher-info/:teacherId", 
            element:<TeacherInfoPage/>
        },
        { path: "/teacher-edit/:teacherId", 
            element:<TeacherEditInfoPage/>
        },
        { path: "/absent-employ", 
            element:<AbsentPage/>
        },
        { path: "/messages", 
            element:<MassagesPage/>
        },
        { path: "/login", 
            element:<UsersPage/>
        },
        { path: "/userinfo/:userId", 
            element:<UserInfoPage/>
        },
        { path: "/myAttendance/:userId", 
            element:<AttendancePage/>
        },
        { path: "/attendance", 
            element:<AttendanceAdminPage/>
        },
        { path: "/TimetablePage", 
            element:<TimetablePage/>
        },
        { path: "/EmpMessagesPage", 
            element:<EmpMessagesPage/>
        },
        { path: "/mytimetable/:userId", 
            element:<TeacherTimeTablePage/>
        },
  
        { path: "/messagestoadmin/:userId", 
            element:<MessagesToAdminPage/>
        },
        { path: "/showstudent/", 
            element:<ShowStudentPage/>
        },
        { path: "/student-info/:studentId", 
            element:<StudentInfoPage/>
        },
        { path: "/add-student", 
            element:<AddStudentPage/>
        },
        { path: "/edit-student/:studentId", 
            element:<StudentEditInfoPage/>
        },
        { path: "/classlist",  
            element:<ClassListPage/>
        },
        { path: "/mytimetables/:userId",  
            element:<StudentTimeTablePage/>
        },
  
        { path: "/studentmessagestoadmin/:userId",  
            element:<StudentMessagesToAdminPage/>
        },
        { path: "/studenttoadmin",  
            element:<MessagesFromStudentToAdmin/>
        },
        { path: "/mystudents/:userId",  
            element:<MyStudentsPage/>
        },
  
        { path: "/homework/:userId",  
            element:<HomeWorkPage/>
        },
  
  
        { path: "/myhomework/:userId",  
            element:<MyHomeWorkPage/>
        },
  
    ],
)


export default router
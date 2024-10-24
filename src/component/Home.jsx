import React from 'react'
import { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Login from './Users/login.jsx';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function Home() {
    const userData = localStorage.getItem('users');

    if (!userData) {
        location.assign('/login');
    }

    const lo = "https://mostaql.hsoubcdn.com/uploads/portfolios/1110151/65e22e76972f5/3.jpg"
    const image1 = "https://watermark.lovepik.com/photo/40216/5542.jpg_wh1200.jpg"
    const image2 = "https://kidsstories1.com/wp-content/uploads/2024/06/%D8%B3%D8%B9%D8%AF-%D9%88%D8%A7%D9%84%D8%B7%D9%8A%D9%88%D8%B1-%D8%A7%D9%84%D8%AC%D8%A7%D8%A6%D8%B9%D8%A9.png"
    const image3 = "https://img.pikbest.com/illustration/20240616/a-cute-little-middle-kid-going-to-school-happilyback_10607508.jpg!w700wp"
    return (

        <>

            <div className="alert alert-primary" role="alert" style={{ width: "100%", margin: "auto", textAlign: "center", fontSize: "1.4rem" }}>

                هذا الموقع تم تصميمه من قبل  محمد خالد تحت اشراف بشمهندس حسام خليل
            </div>

            <div class="card mb-3" style={{ width: "100%", margin: "auto", marginTop: "3rem", borderRadius: "10px", overflow: "hidden", fontFamily: "Noto Naskh Arabic', serif !important", fontStyle: "lage" }}>
                <div class="row g-0" style={{ backgroundColor: "#4f85d7" }}>
                    <div class="col-md-4 " style={{ padding: "1rem" }}>
                        <img src={lo} class="img-fluid rounded-start" alt="..." style={{ width: "70%", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body " style={{ color: "white", fontSize: "1.4rem" }}>
                            <p class="card-text"><p>اهلا بك في منصة سكولايف بلس</p>
                                <p style={{ marginBottom: "0.4" }}> {userData}</p>


                                نرحب بك في صفحتك الخاصة  هنا، ستكتشف عالمًا من الإبداع والتفاعل والتعليم الشيق حيث يمكنك متابعة تقدم طلابك، وتوفير تجارب تعلم استثنائية. نتطلع إلى رؤية إبداعاتك وجهودك في تحقيق تجربة تعليمية رائعة لطلابك. معًا، سنصنع فرصًا لنموهم وتطورهم الأكاديمي</p>

                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", padding: "1rem 1rem 1rem 1rem", backgroundColor: "white", borderRadius: "10px" }}>
                <h3> اعلانات : </h3>
                <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={image1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>



    )
}

export default Home
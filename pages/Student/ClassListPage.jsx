import React from 'react'
import ClassList from '../../src/component/Student/ClassList'
import Nav from '../../src/component/Nav'
import Sidebar from '../../src/component/Sidebar/Sidebar'




function ClassListPage() {
    return (
        <>
            <div class="main-container" id="container">
                <Sidebar></Sidebar>

                <div id="content">
                    <div class="middle-content container-xxl p-0">
                        <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
                            <Nav />

                            <ClassList />



                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ClassListPage

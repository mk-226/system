import React from 'react'
import Absent from '../src/component/Absent/absent'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'


function AbsentPage() {
    return (
        <>
            <div class="main-container" id="container">
                <Sidebar></Sidebar>

                <div id="content">
                    <div class="middle-content container-xxl p-0">
                        <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
                            <Nav />

                            <Absent>

                            </Absent>


                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default AbsentPage

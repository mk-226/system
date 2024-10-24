import React from 'react'

import Message from '../src/component/Message/mesaages'
import Sidebar from '../src/component/Sidebar/Sidebar'
import Nav from '../src/component/Nav'


function MassagesPage() {
    return (
        <>
            <div class="main-container" id="container">
                <Sidebar></Sidebar>

                <div id="content">
                    <div class="middle-content container-xxl p-0">
                        <div style={{ width: "100%", marginTop: "1rem", position: "relative" }}>
                            <Nav />

                            <Message />



                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default MassagesPage

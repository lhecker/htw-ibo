import React from "react";

import PixelCanvas from "../containers/PixelCanvas";
import Sidebar from "../containers/Sidebar";

export default function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 order-md-12">
                    <Sidebar />
                </div>
                <div className="col-md-8">
                    <PixelCanvas />
                </div>
            </div>
        </div>
    );
}

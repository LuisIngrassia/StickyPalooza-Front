import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <header className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">StickyPalooza</span> 
                    </Link>
                </div>
            </header>
        </div>
    )
}
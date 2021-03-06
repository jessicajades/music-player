import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";
import "./components/style.css";
import logo from "./images/music-jams-logo.png";

function App() {
    return (
        <div className="App">
            <header>
                <div id="navbar">
                    <img src={logo} className="logo" />
                    <div className="links">
                        <Link to="/" className="link">
                            Landing
                        </Link>
                        <Link to="/library" className="link">
                            Library
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <Route exact path="/" component={Landing} />
                <Route path="/library" component={Library} />
                <Route path="/album/:slug" component={Album} />
            </main>
        </div>
    );
}

export default App;

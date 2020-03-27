import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";

function App() {
    return (
        <div className="App">
            <header>
                <nav>
                    <Link to="/">Landing</Link>
                    <Link to="/library">Library</Link>
                </nav>
                <h1>Music Player</h1>
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

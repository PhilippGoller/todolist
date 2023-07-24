import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Titlebar from "./components/titlebar/Titlebar";
import Navigation from "./components/navigation/Navigation";
import Today from "./components/page/Today";
import Week from "./components/page/Week";
import Month from "./components/page/Month";
import All from "./components/page/All";
import Category from "./components/page/Category";
import Search from "./components/page/Search";
import "./App.css";

/**
 * The top-level app component which defines all the routes for the pages.
 */
const App = () => {
    const [showNavigation, setShowNavigation] = useState(true);

    const handleToggleNavigation = () => setShowNavigation(previousState => !previousState);

    return (
        <>
            <Titlebar onToggle={handleToggleNavigation} />
            <div className="content-wrapper">
                <Navigation show={showNavigation} onClose={handleToggleNavigation} />
                <main>
                    <Routes>
                        <Route path="/today" element={<Today />} />
                        <Route path="/week" element={<Week />} />
                        <Route path="/month" element={<Month />} />
                        <Route path="/all" element={<All />} />
                        <Route path="/category/:category_id" element={<Category />} />
                        <Route path="/search/:search_text" element={<Search />} />
                        <Route path="*" element={<Navigate to="/today" replace={true}/>} />
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default App;
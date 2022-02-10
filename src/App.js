import React from "react";
import './App.css';
import {ThemeProvider} from 'react-bootstrap';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GalleryPage from './components/gallery/gallery';
import Menu from './components/menu/menu';
import Location from './components/location/location';
import About from './components/about/about';
import Sidebar from './components/sidebar/sidebar';
import {useState} from 'react';
import ScrollToTop from "./helperFunctions/scrollToTop";
import Footer from "./components/footer/footer";

export const BASE_URL = process.env.REACT_APP_BASE_URL || "/"

console.log({BASE_URL})

function App() {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <BrowserRouter basename={BASE_URL}>
            <ThemeProvider>
                <Sidebar isOpen={isOpen} toggle={toggle}/>
                <Navbar toggle={toggle}/>
                <ScrollToTop/>
                <Switch>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                    <Route exact path={"/gallery"}>
                        <GalleryPage/>
                    </Route>
                    <Route exact path={"/menu"}>
                        <Menu/>
                    </Route>
                    <Route exact path={"/location"}>
                        <Location/>
                    </Route>
                    <Route exact path={"/about"}>
                        <About/>
                    </Route>
                </Switch>
                <Footer/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;

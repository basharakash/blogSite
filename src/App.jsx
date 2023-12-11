// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logOut } from "./store/authSlice";
import { Header, Footer } from "./Components/index";
// eslint-disable-next-line no-unused-vars
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             await authService.getCurrentUser()
    //                 .then((userData) => {
    //                     if (userData) {
    //                         dispatch(login({userData}));
    //                         console.log(userData)
    //                     } else {
    //                     dispatch(logOut());
    //                     }
    //                 })
    //                 .finally(() => setloading(false))
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     fetchData();
    // }, [dispatch]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const userData = await authService.getCurrentUser();

    //             if (userData) {
    //                 dispatch(login({ userData }));
    //                 console.log(userData);
    //             } else {
    //                 dispatch(logOut());
    //             }
    //         } catch (error) {
    //             // Handle any errors that occur during the fetching process
    //             console.error("Error fetching user data:", error);
    //         } finally {
    //             setloading(false);
    //         }
    //     };

    //     fetchData();
    // }, [dispatch]);

    // useEffect(() => {
    //     let isMounted = true; // Variable to track component mount state

    //     const fetchData = async () => {
    //         try {
    //             const userData = await authService.getCurrentUser();

    //             if (isMounted) {
    //                 // Check if the component is still mounted before dispatching actions
    //                 if (userData) {
    //                     dispatch(login({ userData: await  userData }));
    //                     console.log(userData);
    //                 } else {
    //                     dispatch(logOut());
    //                 }
    //             }
    //         } catch (error) {
    //             // Handle any errors that occur during the fetching process
    //             console.error("Error fetching user data:", error);
    //         } finally {
    //             if (isMounted) {
    //                 // Set loading to false only if the component is still mounted
    //                 setloading(false);
    //             }
    //         }
    //     };

    //     fetchData();

    //     // Cleanup function to update the mounted state when the component is unmounted
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [dispatch]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const userDataPromise = authService.getCurrentUser();
                const userData = await userDataPromise;

                if (isMounted) {
                    if (userData) {
                        const resolvedUserData = await userData; // Ensure the Promise is resolved
                        dispatch(login({ userData: resolvedUserData }));
                        console.log(resolvedUserData);
                    } else {
                        dispatch(logOut());
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                if (isMounted) {
                    setloading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
            <div className="w-full block">
                <Header />
                <main>
                    TODO: <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;

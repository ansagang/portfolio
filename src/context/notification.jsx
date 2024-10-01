"use client"

import { useEffect, useState } from "react";
import { Icons } from "@/config/icons";

function Notification(props) {
    const [exit, setExit] = useState(false)
    const [intervalID, setIntervalID] = useState(null)
    const [width, setWidth] = useState(0)

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5;
                }

                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    };

    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])

    useEffect(() => {
        handleStartTimer()
    }, [])

    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification ${exit ? "exit" : ""}`} >
            {/* <div className="notification__img">
                {
                    props.type === "success" ?
                        <Icons.success />
                        :
                        props.type === "info" ?
                            <Icons.info />
                            :
                            props.type === "warning" ?
                                <Icons.warning />
                                :
                                props.type === "error" ?
                                    <Icons.error />
                                    :
                                    null
                }
            </div> */}
            <div className="notification__content">
                {/* <div className="notification__title title">
                    <h3>{props.title}</h3>
                </div> */}
                <div className="notification__info info">
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )

}

export default Notification
"use client"

import { NotificationGet } from "@/context/notification-provider"

export default function responseHandler() {
    const dispatch = NotificationGet()


    function getTitle(type, language) {
        switch (type) {
            case "success":
                return language.res.success
            case "info":
                return language.res.info
            case "warning":
                return language.res.warning
            case "error":
                return language.res.error
            default:
                return null
        }
    }

    function notification({ message, type, language }) {
        const title = getTitle(type, language)
        if (Array.isArray(message)) {
            message.forEach(message => {
                dispatch({
                    type: type,
                    message: message,
                    title: title
                })
            })
        } else {
            dispatch({
                type: type,
                message: message,
                title: title
            })
        }
    }

    return notification
}
import { languages } from "@/config/languages";

export function slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '_');
}

export function unslugify(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function isDev() {
    return process.env && process.env.NODE_ENV === "development"
}

export function languageDecode(lang) {
    for (let item of languages) {
        if (lang === item.code) {
            return item
        }
    }
}

export function createdAtDecode(createdAt) {
    const date = new Date(createdAt).toLocaleDateString();
    const time = new Date(createdAt).toLocaleTimeString();
    // const day = new Date(createdAt).();
    // console.log(day);

    return {
        time,
        date
    }
}

export function formatDate(inputDate, language) {
    // Split the input date string by '.' separator
    const parts = inputDate.split('.');
    
    // Create a Date object using the parts
    const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    
    // Get month name
    const monthNames = language.app.global.months
    const monthIndex = dateObj.getMonth();
    const monthName = monthNames[monthIndex];

    // Get day and year
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    // Format the date
    const formattedDate = `${monthName} ${day}, ${year}`;
    
    return formattedDate;
}

export function generateUsernameFromGmail(email) {
    const username = email.split('@')[0];
    
    // Remove dots
    const usernameWithoutDots = username.replace(/\./g, '_');
    
    const uniqueString = Math.random().substring(7);
    
    const uniqueUsername = usernameWithoutDots + '_' + uniqueString;
    
    return uniqueUsername;
}

export function yearsSince(sinceYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - sinceYear;
}
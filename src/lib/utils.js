import { languages } from "@/config/languages";

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "_");
}

export function unslugify(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isDev() {
  return process.env && process.env.NODE_ENV === "development";
}

export function languageDecode(lang) {
  for (let item of languages) {
    if (lang === item.code) {
      return item;
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
    date,
  };
}

export function formatDate(inputDate, language) {
  // Split the input date string by '.' separator
  const parts = inputDate.split(".");

  // Create a Date object using the parts
  const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  // Get month name
  const monthNames = language.app.global.months;
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
  const username = email.split("@")[0];

  // Remove dots
  const usernameWithoutDots = username.replace(/\./g, "_");

  const uniqueString = Math.random().substring(7);

  const uniqueUsername = usernameWithoutDots + "_" + uniqueString;

  return uniqueUsername;
}

export function yearsSince(sinceYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - sinceYear;
}

export function randomWord(wordsArray) {
  const usedIndices = new Set();

  return function () {
    if (usedIndices.size === wordsArray.length) {
      return null; // All words have been used
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * wordsArray.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    return wordsArray[randomIndex];
  };
}

export function findCommonElement(array1, array2) {

    // Loop for array1
    for (let i = 0; i < array1.length; i++) {

        // Loop for array2
        for (let j = 0; j < array2.length; j++) {

            // Compare the element of each and
            // every element from both of the
            // arrays
            if (array1[i] === array2[j]) {

                // Return if common element found
                return true;
            }
        }
    }

    // Return if no common element exist
    return false;
}

export default async function facetsFinder(array, value) {

  const values = []
  array.forEach(element => {

      element[value].forEach(element => {
        values.push(element)
      })
  });
  const valuesUnique = Array.from(new Set(values))

  return valuesUnique
}
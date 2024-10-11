import { useSelector } from "react-redux";

export const formatIsoString = (isoString) => {
    let date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    
    // Convert to 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');

    date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${minutes} ${ampm}`;

    return { date, time };
}
export function formatIsoToDate(dateString) {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    // Return in the format "dd/mm/yy"
    return `${day}/${month}/${year}`;
}
// Example usage:
// const formattedDate = formatIsoToDate("2024-09-26T11:50:26.110Z");
// console.log(formattedDate);  // Output: "26/09/24"


const sortByDate = (array, order) => {
    let sortedArray = [...array];
    if(order === "recent") {
        sortedArray = sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
        sortedArray = sortedArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return sortedArray
}



import { DOMParser } from 'xmldom'

export default async function() {
    let response = await fetch('https://blog.neurosama.com/feed.xml');
    if (response.status != 200) {
        return `${response.status}, ${response.statusText}`
    } 

    const parser = new DOMParser();
    console.log("Trying...")
    let domData = parser.parseFromString(response.body, "application/xml");
    console.log("Success")
    console.log(domData)
    return domData;
}
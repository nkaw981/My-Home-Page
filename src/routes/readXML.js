import { DOMParser } from 'xmldom'

export default async function() {
    let response = await fetch('https://blog.neurosama.com/feed.xml', {
        cf: {
            cacheTtl: 600,
			cacheEverything: true
        }
    });
    if (response.status != 200) {
        return `${response.status}, ${response.statusText}`
    } 

    const parser = new DOMParser();
    let domData = parser.parseFromString(await response.text(), "text/xml");
    return `${typeof domData.children}\n${domData.children}\n----\n${domData}`;
}
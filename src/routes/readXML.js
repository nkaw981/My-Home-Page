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
    let domData = parser.parseFromString(JSON.stringify(response.body), "text/xml");
    return JSON.stringify(response.body);
}
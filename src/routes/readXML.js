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
    let domData = parser.parseFromString(await response.text(), "text/xml").childNodes.item(2);
    const testString = ``;
    for (let i = 0; i < domData.childNodes.length; i++) {
        testString.concat(domData.childNodes.item(i));
        testString.concat("\n\n");
    }
    return `${domData.childNodes.length}\n\n${testString}\n-------------\n${domData.childNodes.item(5)}`;
}
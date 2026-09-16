export default async function() {
    let xmlData = (await fetch('https://blog.neurosama.com/feed.xml')).body;
    const parser = new DOMParser();
    let domData = parser.parseFromString(xmlData, "application/xml");
    return domData.documentElement.nodeName;
}
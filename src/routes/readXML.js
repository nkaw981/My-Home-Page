export default async function() {
    let xmlData = (await fetch('https://blog.neurosama.com/feed.xml')).body;
    return xmlData;
}
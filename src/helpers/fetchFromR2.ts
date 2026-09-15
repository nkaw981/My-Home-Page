export async function fetchFromR2(env, fileName, method, fileContent) {
  /*
  * A function that selects which method should be used on a bucket based on the request
  * in index.js.
  */
  switch (method) {
    case "GET": {
        const object = await env.MY_BUCKET.get(fileName);
      
        if (object === null) {
          return new Response(`Object Not Found: ${fileName}`, { status: 404 });
        }
      
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
      
        return new Response(object.body, {
          headers,
        });
    }
    case "PUT": {
      await env.MY_BUCKET.put(fileName, fileContent);
      return new Response(null, {status: 201})
    }
    case "DELETE": {
      await env.MY_BUCKET.delete(fileName)
      return new Response(null, {status: 204})
    }
    default:
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "PUT, GET, DELETE",
        },
      });
  }
  
}
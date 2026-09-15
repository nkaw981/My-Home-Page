import { AutoRouter } from 'itty-router'
import { fetchFromR2 } from './helpers/fetchFromR2';
import { QueryFromD1 } from './helpers/queryFromD1';

const router = AutoRouter();

/*
* Demonstrations of regular routing.
*/
router.get('/', (request, env) => {
  return new Response(`Hi!`);
})

router.get('/ping', (request, env) => {
	return new Response(`Pong.`);
})

/*
* Demonstrations on the Cloudflare R2 Bucket, with CRUD operations.
*/

router.get('/r2-bucket/', async (request, env) => {
	return new Response(`This is a Cloudflare R2 Bucket. You can GET stuff, PUT stuff, and DELETE stuff`)
})

router.get('/r2-bucket/:fileName', async (request, env) => {
	return await fetchFromR2(env, request.params.fileName, "GET", null)
})

router.put('/r2-bucket/:fileName', async (request, env) => {
	if (!server.isCorrectSecret(env, request.headers.get("X-Custom-Auth-Key"))) {
		return new Response("Bad secret.", {status: 401})
	}
	if (!server.isValidMultiFormData(request)) {
		return new Response("Malformed request, must be in proper multipart/form-data", {status: 400});
	}
	let fileContent = ((await request.formData()).entries().next()).value[1];
	return await fetchFromR2(env, request.params.fileName, "PUT", fileContent);
})

router.delete('/r2-bucket/:fileName', async (request, env) => {
	if (!(isCorrectSecret(env, request.headers.get("X-Custom-Auth-Key")))) {
		return new Response("Bad secret.", {status: 401})
	}
	return await fetchFromR2(env, request.params.fileName, "DELETE", null)
})

/*
* Demonstrations on the Cloudflare D1 Database, with simple read and write queries.
*/

router.get('/d1-database/', async (request, env) => {
	return await QueryFromD1.selectAllFromTable(env);
})

router.post('/d1-database/', async (request, env) => {
	if (!server.isCorrectSecret(env, request.headers.get("X-Custom-Auth-Key"))) {
		return new Response("Bad secret.", {status: 401})
	}
	return await QueryFromD1.insertToTable(env, await request.json())
})

router.delete('/d1-database/', async (request, env) => {
	if (!server.isCorrectSecret(env, request.headers.get("X-Custom-Auth-Key"))) {
		return new Response("Bad secret.", {status: 401})
	}
	return await QueryFromD1.deleteAllRows(env)
})

/*
* Catch-all erroneous URLs.
*/

router.all('*', () => new Response('Not Found.', { status: 404 }));

/*
* Helper functions. Mainly for anything involving data writing.
*/

function isValidMultiFormData(request) {
	/*
	* Checks if the request is a valid multipart/form-data format.
	*/
	let correctType = request.headers.get('Content-Type').includes('multipart/form-data')
	let isMalformed = /[\-\w]+\r\nContent-Disposition:\sform-data;\sname=.*\r\n/.test(request.body)
	return correctType && !isMalformed
}

function isCorrectSecret(env, secret) {
	/*
	* Checks if the provided secret matches the environment's stored write secret.
	*/
	return env.WRITE_SECRET === secret;
}

/*
* Finally create our server, and export it for Cloudflare Workers to recognize. 
*/

const server = {
	isValidMultiFormData,
	isCorrectSecret,
	fetch: router.fetch,
};

export default server;
import { AutoRouter } from 'itty-router'
import { fetchFromR2 } from './helpers/fetchFromR2';
import { QueryFromD1 } from './helpers/queryFromD1';
import homepage from './assets/home'
import readXML from './routes/readXML';

const router = AutoRouter();

/*
* Demonstrations of regular routing.
*/
router.get('/', async (request, env) => {
  	return new Response(homepage(), {
		headers: {
			'content-type': 'text/html'
		}
	});
});

router.get('/ping', (request, env) => {
	return new Response(`Pong.`);
});

router.get('/xml-reader', async (request, env) => {
	let output = await readXML();
	return new Response(output);
});

/*
* Catch-all erroneous URLs.
*/

router.all('*', () => new Response('Not Found.', { status: 404 }));

/*
* Helper functions. Mainly for anything involving data writing.
*/

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
	isCorrectSecret,
	fetch: router.fetch,
};

export default server;
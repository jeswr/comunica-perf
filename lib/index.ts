import { Bus, ActionContext } from '@comunica/core';
import { ActorHttpNative } from '@comunica/actor-http-native';
import { ActorHttpFetch } from '@comunica/actor-http-fetch';
import { ActorHttp } from '@comunica/bus-http';

async function run() {
  for (const Actor of [
    ActorHttpFetch,
    ActorHttpNative,
  ]) {
    for (const url of ['https://www.rubensworks.net/', 'http://example.org']) {
      const times: [number, number, number][] = [];
      for (let i = 0; i < 100; i += 1) {
        const fetch = new Actor({
          name: 'actor-http',
          bus: new Bus({
            name: 'bus',
          }),
        });

        const tim: [number, number, number] = [0, 0, 0];
        times.push(tim);

        const startTime = Date.now();
        // eslint-disable-next-line no-await-in-loop
        const res = await fetch.run({ input: url, context: new ActionContext() });
        const endTime = Date.now();
        tim[0] = endTime - startTime;

        ActorHttp.toNodeReadable(res.body).on('data', () => {
          tim[1] = Date.now() - endTime;
        }).on('end', () => {
          tim[2] = Date.now() - endTime;
        });
      }

      setTimeout(() => {
        console.log(Actor, url);
        console.log(times.map((t) => t[0]).reduce((a, b) => a + b) / times.length);
        console.log(times.map((t) => t[1]).reduce((a, b) => a + b) / times.length);
        console.log(times.map((t) => t[2]).reduce((a, b) => a + b) / times.length);
      }, 500);
    }
  }
}

run();

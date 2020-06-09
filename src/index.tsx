import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isError } from 'lodash';

import { Event, eventEmitter } from '@/utils/request';

import App from './App';

eventEmitter.on(Event.Error, (err) => {
  const msg = isError(err) ? err.message : (err as { msg: string }).msg;
  console.log(msg);
});

const root = document.createElement('div');
root.id = 'root';
document.body.prepend(root);

ReactDOM.render(<App />, root);

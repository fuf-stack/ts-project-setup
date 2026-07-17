/* eslint-disable */

/* eslint-disable import-x/prefer-default-export */
/* eslint-disable import-x/no-unresolved */
/* eslint-disable n/no-sync */

import lodash from 'lodash';
import { utils } from '@fuf-stack/utils';
import { config } from '@fuf-stack/config';
import fs from 'node:fs';
import type { Config } from '@fuf-stack/config';

export const test = () => {
  const data = lodash.cloneDeep({ foo: 'bar' });
  const result = utils.process(data);
  const appConfig: Config = config.load();
  const exists = fs.existsSync('./file.txt');
  return { result, appConfig, exists };
};

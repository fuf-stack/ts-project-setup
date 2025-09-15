/* eslint-disable */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-x/extensions */
/* eslint-disable import-x/no-unresolved */
/* eslint-disable no-unused-vars */

import moduleStyles from './Some.module.css';
import jsonFile from './data.json';
import fs from 'node:fs';
import react from 'react';

import relative from '../relative/path';
import png from './image.png';
import alsoAbsolute from 'src/also/absolute';
import someOtherThing from '@fuf-stack/some-other-thing';
import { describe, expect, it } from 'vitest';
import jpg from './image.jpg';
import path from 'node:path';

import svg from './image.svg';
import thirdParty from 'third-party-module';
import something from '@fuf-stack/something';
import absolute from 'src/absolute';
import type { ReactElement } from 'react';
import jpeg from './image.jpeg';

// INFO: css imports will not be touched
import 'some-module/style.css';

const MyComponent = (): ReactElement => null;

export default MyComponent;

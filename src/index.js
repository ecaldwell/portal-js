export let VERSION = '0.1.0';

import {default as portal} from './portal';
import {default as auth} from './portal-auth';
import {default as community} from './portal-community';
import {default as content} from './portal-content';
import {default as services} from './portal-services';
import {default as utils} from './portal-utils';

export let portal = {
  portal,
  auth,
  community,
  content,
  services,
  utils
};

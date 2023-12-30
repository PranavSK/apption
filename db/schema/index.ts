import * as auth from './auth';
import * as _public from './public';

export const schema = { ...auth, ..._public };

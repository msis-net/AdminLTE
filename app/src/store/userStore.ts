import { persistentAtom } from '@nanostores/persistent';

const currentDate = persistentAtom<string>('currentDate', '' );
//export const statusStore = persistentAtom('');

export type SettingsValue = {
    correntDate: String,
    Hospinf: {},
    authdata: {},
    vByoto: {},
    vSrynaiyo: {},
  }

const valData = persistentAtom('valdata', '')

export { currentDate ,valData }
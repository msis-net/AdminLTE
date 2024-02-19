import { persistentAtom } from '@nanostores/persistent';

//const currentDate = persistentAtom<string>('currentDate', '' );
//export const statusStore = persistentAtom('');

export type SettingsValue = {
    correntDate: String,
    Hospinf: {},
    authdata: {},
    vByoto: {},
    vSrynaiyo: {},
  }

const vDate = persistentAtom('vDate', '')
const vHospinf = persistentAtom('vHospinf', '')
const vByoto = persistentAtom('vByoto', '')
const vSrynaiyo = persistentAtom('vSrynaiyo', '')

export { vDate, vHospinf, vByoto, vSrynaiyo }
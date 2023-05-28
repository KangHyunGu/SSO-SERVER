import { v4 as uuidv4 } from 'uuid';
import Hashids from 'hashids';
const hashids = new Hashids();

const deHyphenatedUUID = ()=> uuidv4().replace(/-/gi, "");
const encodedId = () => hashids.encodeHex(deHyphenatedUUID());

export default encodedId;
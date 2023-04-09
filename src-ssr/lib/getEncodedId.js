import {v4 as uuidv4} from 'uuid';
import Hashids from 'hashids';
const hashids = new Hashids();

// 자동으로 uuid 생성됨
const deHyphenatedUUID = () => uuidv4().replace(/-/gi, "");
// 유튜브 재생 ID와 유사하게 deHyphenatedUUID나온 값에 encode 처리 후 반환
const encodedId = () => hashids.encodeHex(deHyphenatedUUID());

export default encodedId;

import CryptRepository from "../../../../core/ports/crypt/Crypt.repository";
import {pCrypt} from "../config/PCryptConfig";

export default class CryptRepositoryPCrypt implements CryptRepository {
    compare(password: string, crypt_password: string): Promise<boolean> {
        return pCrypt.compare(password, crypt_password);
    }

    crypt(password: string): Promise<string> {
        return pCrypt.hash(password);
    }
}

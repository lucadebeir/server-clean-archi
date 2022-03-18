export default interface CryptRepository {
    crypt(password: string): Promise<string>;
    compare(password: string, crypt_password: string): Promise<boolean>;
}

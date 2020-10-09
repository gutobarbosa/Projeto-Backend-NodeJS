import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiscStorageProvider implements IStorageProvider {
    public async saveFile(file:string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.directory,'uploads', file),
        )
    }

    public async deleteFile(file:string): Promise<void> {

    }
}

export default DiscStorageProvider;

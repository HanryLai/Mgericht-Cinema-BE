import { apiKeyModel } from '../models/apikey.model';

class apiTokenService {
    public static findById = async (key: string) => {
        const keyd = await apiKeyModel.create({ key: 'ssdas', status: true });
        console.log("keyyy:",keyd);
        const objKey = await apiKeyModel.findOne({ key, status: true }).lean(true);
        return objKey;
    };
}

export default apiTokenService;

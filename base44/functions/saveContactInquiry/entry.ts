import { saveWebsiteInquiry } from '../../shared/saveWebsiteInquiry.ts';

export default async function(req: Request): Promise<Response> {
    return await saveWebsiteInquiry(req);
}
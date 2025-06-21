import { GoogleDriveService } from '@/lib/google-drive';
import { PRODUCT_ATTACHMENT_TYPES } from '@/modules/products/constants';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import z from 'zod';

export const fileRouter = createTRPCRouter({
    load: baseProcedure
        .input(
            z.object({
                url: z.string(),
                type: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const { url, type } = input;

            switch (type) {
                case PRODUCT_ATTACHMENT_TYPES.GOOGLE_DRIVE:
                    // Extract file ID from URL
                    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
                    if (!fileIdMatch) {
                        throw new Error('Invalid Google Drive URL');
                    }

                    const fileId = fileIdMatch[1] as string;
                    const driveService = new GoogleDriveService();
                    const fileMetadata = await driveService.getFileMetadata(fileId);

                    if (!fileMetadata) {
                        throw new TRPCError({
                            code: 'FORBIDDEN',
                            message: 'File not found or not accessible',
                        });
                    }

                    const response = {
                        ...fileMetadata,
                        directLink: driveService.getDirectLink(fileId),
                        embedLink: driveService.getEmbedLink(fileId),
                        isViewable: driveService.isViewableType(fileMetadata.mimeType),
                    };

                    return response;

                default:
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Invalid file type',
                    });
            }
        }),
});

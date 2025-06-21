import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { DriveFileViewer } from './file-viewer';

type Props = {
    title: string;
    subTitle: string;
    url: string;
    type: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const FileViewerDialog: React.FC<Props> = ({ title, subTitle, url, type, open, onOpenChange }) => {
    const trpc = useTRPC();
    const { data: file, isLoading } = useQuery(
        trpc.file.load.queryOptions({
            url,
            type,
        }),
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-screen min-h-screen flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{subTitle}</DialogDescription>
                </DialogHeader>

                <div className="flex-1">
                    {file ? (
                        <DriveFileViewer fileData={file} />
                    ) : isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                            <span className="ml-2 text-gray-600">Loading file...</span>
                        </div>
                    ) : (
                        <div className="italic text-gray-600">Cannot load provided file</div>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="elevated">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

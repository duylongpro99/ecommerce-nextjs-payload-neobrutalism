import { Button } from '@/components/ui/button';
import { LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { FileViewerDialog } from '../../files/components/file-viewer-dialog';

type Props = {
    title: string;
    subTitle: string;
    url: string;
    type: string;
};

export const Attachment: React.FC<Props> = ({ title, subTitle, url, type }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-start w-full">
            <Button
                variant="link"
                className="flex items-center cursor-pointer border-none h-fit"
                onClick={() => {
                    setOpen(() => !open);
                }}
                style={{ paddingLeft: 0 }}
            >
                <LinkIcon className="size-4" />
                <p className="text-base font-medium truncate">{title}</p>
            </Button>
            <p className="text-sm italic ml-6">{subTitle}</p>
            {open && (
                <FileViewerDialog
                    title={title}
                    subTitle={subTitle}
                    url={url}
                    type={type}
                    onOpenChange={(open) => {
                        setOpen(open);
                    }}
                    open={open}
                />
            )}
        </div>
    );
};

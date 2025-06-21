import { Button } from '@/components/ui/button';
import { LinkIcon } from 'lucide-react';
import { PRODUCT_ATTACHMENT_TYPES } from '../constants';

type Props = {
    title: string;
    subTitle: string;
    url: string;
    type: string;
};
export const Attachment: React.FC<Props> = ({ title, subTitle, url, type }) => {
    const onOpen = () => {
        switch (type) {
            case PRODUCT_ATTACHMENT_TYPES.GOOGLE_DRIVE:
            default:
                window.open(url, '_blank');
        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            <Button
                variant="link"
                className="flex items-center cursor-pointer border-none h-fit"
                onClick={onOpen}
                style={{ paddingLeft: 0 }}
            >
                <LinkIcon className="size-4" />
                <p className="text-base font-medium truncate">{title}</p>
            </Button>
            <p className="text-sm italic ml-6">{subTitle}</p>
        </div>
    );
};

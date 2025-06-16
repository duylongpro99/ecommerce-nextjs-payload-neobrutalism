import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface NavBarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavBarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({ items, open, onOpenChange }) => {
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="border-b p-4">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item) => (
                        <Link
                            prefetch
                            key={item.href}
                            href={item.href}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={() => {
                                onOpenChange(false);
                            }}
                        >
                            {item.children}
                        </Link>
                    ))}

                    {session.data?.user ? (
                        <>
                            <div className="border-t">
                                <Link
                                    prefetch
                                    href="/admin"
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => {
                                        onOpenChange(false);
                                    }}
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="border-t">
                                <Link
                                    prefetch
                                    href="/sign-in"
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => {
                                        onOpenChange(false);
                                    }}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/sign-up"
                                    prefetch
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => {
                                        onOpenChange(false);
                                    }}
                                >
                                    Start selling
                                </Link>
                            </div>
                        </>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

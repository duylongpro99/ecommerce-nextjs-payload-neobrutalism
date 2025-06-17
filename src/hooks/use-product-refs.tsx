import { isAfter, sub, toDate } from 'date-fns';
import { useEffect, useMemo, useState, useTransition } from 'react';

interface StorageProductRef {
    id: string;
    url: string;
    time: number;
}

interface ProductRef {
    id?: string | null;
    url: string;
}

const KEY = 'PRODUCT_REFS';

export const useProductRefs = ({ refs = [] }: { refs: ProductRef[] }) => {
    const invalidDuration = process.env.NEXT_PUBLIC_INVALID_REF_DURATION!;
    const invalidUnit = process.env.NEXT_PUBLIC_INVALID_REF_UNIT!;

    const [storageRefs, setStorageRefs] = useState<StorageProductRef[]>([]);
    const [, updateRef] = useTransition();

    const getStorageRefs = () => {
        const storageStr = localStorage.getItem(KEY);
        const storageRefs = storageStr ? (JSON.parse(storageStr) as StorageProductRef[]) : [];

        return storageRefs;
    };

    useEffect(() => {
        const storageRefs = getStorageRefs();
        setStorageRefs(storageRefs);
    }, []);

    const validRefs = useMemo(() => {
        return refs.filter((ref) => {
            if (!ref.id) return false;
            if (!invalidDuration || !invalidUnit) return false;

            const existedRef = storageRefs.find((r) => r.id === ref.id);
            if (existedRef?.time) {
                const refDate = toDate(Number(existedRef.time));
                const now = new Date();

                const subDate = sub(now, {
                    [invalidUnit]: Number(invalidDuration),
                });

                return isAfter(subDate, refDate);
            }

            return true;
        });
    }, [refs, storageRefs]);

    const openRef = () => {
        if (!validRefs.length) return;
        const ref = validRefs[0] as ProductRef;
        const time = new Date().getTime();
        const updateStorageRefs = storageRefs.map((item) => ({ ...item }));
        const existedRef = updateStorageRefs.find((r) => r.id === ref.id);
        if (existedRef) {
            existedRef.time = time;
            setStorageRefs([...updateStorageRefs]);
        } else {
            updateStorageRefs.push({
                id: ref.id as string,
                url: ref.url,
                time,
            });
            setStorageRefs([...updateStorageRefs]);
        }

        updateRef(() => {
            const localStorageRefs = getStorageRefs();
            const updateStorageRef = localStorageRefs.find((r) => r.id === ref.id);
            if (updateStorageRef) {
                updateStorageRef.time = time;
                localStorage.setItem(KEY, JSON.stringify(localStorageRefs));
            } else {
                localStorage.setItem(
                    KEY,
                    JSON.stringify([
                        ...localStorageRefs,
                        {
                            id: ref.id,
                            url: ref.url,
                            time,
                        },
                    ]),
                );
            }
        });

        window.open(ref.url, '_blank');
    };

    return {
        openRef,
    };
};

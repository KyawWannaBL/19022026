import { useState, useCallback, useMemo } from 'react';
import { TAG_STATUS } from '@/lib/index';
export const useTamperTags = () => {
    const [tags, setTags] = useState([]);
    const [activeBatchId, setActiveBatchId] = useState(null);
    const issueBatch = useCallback((riderId, fromId, toId) => {
        const batchId = `BATCH-${Date.now()}`;
        const newTags = [];
        for (let i = fromId; i <= toId; i++) {
            const tagId = `TT-${i.toString().padStart(6, '0')}`;
            newTags.push({
                id: tagId,
                status: TAG_STATUS.ISSUED_TO_RIDER,
                batchId: batchId,
                issuedTo: riderId,
                issueDate: new Date().toISOString(),
            });
        }
        setTags(prev => [...prev, ...newTags]);
        setActiveBatchId(batchId);
        return batchId;
    }, []);
    const useTag = useCallback((tagId) => {
        setTags(prev => prev.map(tag => tag.id === tagId
            ? { ...tag, status: TAG_STATUS.USED }
            : tag));
    }, []);
    const voidTag = useCallback((tagId, reason, photo) => {
        setTags(prev => prev.map(tag => tag.id === tagId
            ? { ...tag, status: TAG_STATUS.VOID, voidReason: reason, voidPhoto: photo }
            : tag));
    }, []);
    const markLost = useCallback((tagRange) => {
        setTags(prev => prev.map(tag => tagRange.includes(tag.id)
            ? { ...tag, status: TAG_STATUS.LOST_SUSPECT }
            : tag));
    }, []);
    const getRiderTags = useCallback((riderId) => {
        return tags.filter(tag => tag.issuedTo === riderId);
    }, [tags]);
    const getReconciliation = useCallback((riderId, physicalCount) => {
        const riderTags = tags.filter(tag => tag.issuedTo === riderId);
        const issued = riderTags.length;
        const used = riderTags.filter(t => t.status === TAG_STATUS.USED).length;
        const voided = riderTags.filter(t => t.status === TAG_STATUS.VOID).length;
        const remaining = issued - used - voided;
        return {
            issued,
            used,
            voided,
            remaining,
            mismatch: remaining !== physicalCount
        };
    }, [tags]);
    const validateTagForPickup = useCallback((tagId, rider) => {
        const tag = tags.find(t => t.id === tagId);
        if (!tag)
            return { valid: false, error: 'Tag not found in system' };
        if (tag.status !== TAG_STATUS.ISSUED_TO_RIDER)
            return { valid: false, error: `Tag is ${tag.status}` };
        if (rider && tag.issuedTo !== rider.id)
            return { valid: false, error: 'Tag issued to a different rider' };
        return { valid: true };
    }, [tags]);
    const activeBatchTags = useMemo(() => {
        if (!activeBatchId)
            return [];
        return tags.filter(t => t.batchId === activeBatchId);
    }, [tags, activeBatchId]);
    return {
        tags,
        activeBatchId,
        activeBatchTags,
        issueBatch,
        useTag,
        voidTag,
        markLost,
        getRiderTags,
        getReconciliation,
        validateTagForPickup,
        setActiveBatchId
    };
};

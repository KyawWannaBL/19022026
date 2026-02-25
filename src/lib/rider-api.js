import { supabase } from '@/integrations/supabase/client';
// Rider API Class
export class RiderAPI {
    // Get rider profile by user ID
    static async getRiderProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('riders_2026_02_04_14_23')
                .select('*')
                .eq('user_id', userId || (await supabase.auth.getUser()).data.user?.id)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Error fetching rider profile:', error);
            return null;
        }
    }
    // Update rider profile
    static async updateRiderProfile(riderId, updates) {
        try {
            const { error } = await supabase
                .from('riders_2026_02_04_14_23')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', riderId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error updating rider profile:', error);
            return false;
        }
    }
    // Update duty status
    static async updateDutyStatus(riderId, dutyStatus) {
        try {
            const { error } = await supabase
                .from('riders_2026_02_04_14_23')
                .update({ duty_status: dutyStatus, updated_at: new Date().toISOString() })
                .eq('id', riderId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error updating duty status:', error);
            return false;
        }
    }
    // Get rider tasks
    static async getRiderTasks(riderId, status, type) {
        try {
            let query = supabase
                .from('rider_tasks_2026_02_04_14_23')
                .select('*')
                .eq('rider_id', riderId)
                .order('createdAt', { ascending: false });
            if (status) {
                query = query.eq('status', status);
            }
            if (type) {
                query = query.eq('type', type);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching rider tasks:', error);
            return [];
        }
    }
    // Get single task
    static async getTask(taskId) {
        try {
            const { data, error } = await supabase
                .from('rider_tasks_2026_02_04_14_23')
                .select('*')
                .eq('id', taskId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Error fetching task:', error);
            return null;
        }
    }
    // Update task status
    static async updateTaskStatus(taskId, status, updates) {
        try {
            const updateData = {
                status,
                updated_at: new Date().toISOString(),
                ...updates
            };
            // Set timestamps based on status
            if (status === 'in_progress' && !updates?.started_at) {
                updateData.started_at = new Date().toISOString();
            }
            else if (status === 'completed' && !updates?.completed_at) {
                updateData.completed_at = new Date().toISOString();
            }
            const { error } = await supabase
                .from('rider_tasks_2026_02_04_14_23')
                .update(updateData)
                .eq('id', taskId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error updating task status:', error);
            return false;
        }
    }
    // Get rider transactions
    static async getRiderTransactions(riderId, limit = 50) {
        try {
            const { data, error } = await supabase
                .from('rider_transactions_2026_02_04_14_23')
                .select('*')
                .eq('rider_id', riderId)
                .order('createdAt', { ascending: false })
                .limit(limit);
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching rider transactions:', error);
            return [];
        }
    }
    // Add transaction
    static async addTransaction(transaction) {
        try {
            const { error } = await supabase
                .from('rider_transactions_2026_02_04_14_23')
                .insert([transaction]);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error adding transaction:', error);
            return false;
        }
    }
    // Update rider location
    static async updateLocation(riderId, location) {
        try {
            const { error } = await supabase
                .from('rider_locations_2026_02_04_14_23')
                .insert([{ rider_id: riderId, ...location }]);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error updating location:', error);
            return false;
        }
    }
    // Get rider notifications
    static async getNotifications(riderId, unreadOnly = false) {
        try {
            let query = supabase
                .from('rider_notifications_2026_02_04_14_23')
                .select('*')
                .eq('rider_id', riderId)
                .order('createdAt', { ascending: false });
            if (unreadOnly) {
                query = query.eq('is_read', false);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    }
    // Mark notification as read
    static async markNotificationRead(notificationId) {
        try {
            const { error } = await supabase
                .from('rider_notifications_2026_02_04_14_23')
                .update({ is_read: true })
                .eq('id', notificationId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }
    // Get rider statistics
    static async getRiderStats(riderId) {
        try {
            // Get task counts
            const { data: tasks } = await supabase
                .from('rider_tasks_2026_02_04_14_23')
                .select('status, cod_amount')
                .eq('rider_id', riderId);
            // Get today's earnings
            const today = new Date().toISOString().split('T')[0];
            const { data: transactions } = await supabase
                .from('rider_transactions_2026_02_04_14_23')
                .select('amount, transaction_type')
                .eq('rider_id', riderId)
                .gte('createdAt', today + 'T00:00:00.000Z')
                .lt('createdAt', today + 'T23:59:59.999Z');
            const stats = {
                pending: tasks?.filter(t => ['pending', 'assigned', 'in_progress'].includes(t.status)).length || 0,
                completed: tasks?.filter(t => t.status === 'completed').length || 0,
                failed: tasks?.filter(t => t.status === 'failed').length || 0,
                cod: tasks?.filter(t => t.status === 'completed').reduce((sum, t) => sum + (t.cod_amount || 0), 0) || 0,
                todayEarnings: transactions?.filter(t => t.transaction_type === 'delivery_fee').reduce((sum, t) => sum + t.amount, 0) || 0
            };
            return stats;
        }
        catch (error) {
            console.error('Error fetching rider stats:', error);
            return { pending: 0, completed: 0, failed: 0, cod: 0, todayEarnings: 0 };
        }
    }
    // Complete delivery with proof
    static async completeDelivery(taskId, proofData) {
        try {
            const { error } = await supabase
                .from('rider_tasks_2026_02_04_14_23')
                .update({
                status: 'completed',
                completed_at: new Date().toISOString(),
                proof_photo_url: proofData.proofPhotoUrl,
                signature_data: proofData.signatureData,
                completion_notes: proofData.completionNotes,
                updated_at: new Date().toISOString()
            })
                .eq('id', taskId);
            if (error)
                throw error;
            // If COD was collected, add transaction
            if (proofData.codCollected) {
                const task = await this.getTask(taskId);
                if (task && task.cod_amount > 0) {
                    await this.addTransaction({
                        rider_id: task.rider_id,
                        task_id: taskId,
                        transaction_type: 'cod_collection',
                        amount: task.cod_amount,
                        description: `COD collected from ${task.customer_name} - Order ${task.task_code}`,
                        reference_number: `COD-${task.task_code}`,
                        status: 'completed'
                    });
                    // Add delivery fee transaction
                    if (task.delivery_fee > 0) {
                        await this.addTransaction({
                            rider_id: task.rider_id,
                            task_id: taskId,
                            transaction_type: 'delivery_fee',
                            amount: task.delivery_fee,
                            description: `Delivery fee earned - Order ${task.task_code}`,
                            reference_number: `FEE-${task.task_code}`,
                            status: 'completed'
                        });
                    }
                }
            }
            return true;
        }
        catch (error) {
            console.error('Error completing delivery:', error);
            return false;
        }
    }
    // Report failed delivery
    static async reportFailedDelivery(taskId, reason, notes, proofPhotoUrl) {
        try {
            const { error } = await supabase
                .from('rider_tasks_2026_02_04_14_23')
                .update({
                status: 'failed',
                completion_notes: `Failed: ${reason}. ${notes || ''}`,
                proof_photo_url: proofPhotoUrl,
                updated_at: new Date().toISOString()
            })
                .eq('id', taskId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error reporting failed delivery:', error);
            return false;
        }
    }
}
export default RiderAPI;

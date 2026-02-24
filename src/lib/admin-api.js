import { supabase } from '@/integrations/supabase/client';
// Admin Users API
export class AdminUsersAPI {
    static async list() {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async getById(id) {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        return data;
    }
    static async create(user) {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .insert([user])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async update(id, updates) {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async delete(id) {
        const { error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
    }
    static async getByRole(role) {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .select('*')
            .eq('role', role)
            .order('full_name');
        if (error)
            throw error;
        return data || [];
    }
    static async getStats() {
        const { data, error } = await supabase
            .from('admin_users_2026_02_04_16_00')
            .select('role, status');
        if (error)
            throw error;
        const stats = {
            total: data?.length || 0,
            active: data?.filter(u => u.status === 'active').length || 0,
            suspended: data?.filter(u => u.status === 'suspended').length || 0,
            pending: data?.filter(u => u.status === 'pending').length || 0,
            byRole: {}
        };
        data?.forEach(user => {
            stats.byRole[user.role] = (stats.byRole[user.role] || 0) + 1;
        });
        return stats;
    }
}
// Bulk Upload API
export class BulkUploadAPI {
    static async list() {
        const { data, error } = await supabase
            .from('bulk_uploads_2026_02_04_16_00')
            .select('*')
            .order('upload_date', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async create(upload) {
        const { data, error } = await supabase
            .from('bulk_uploads_2026_02_04_16_00')
            .insert([upload])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async getItems(uploadId) {
        const { data, error } = await supabase
            .from('bulk_upload_items_2026_02_04_16_00')
            .select('*')
            .eq('upload_id', uploadId)
            .order('row_number');
        if (error)
            throw error;
        return data || [];
    }
    static async createItems(items) {
        const { data, error } = await supabase
            .from('bulk_upload_items_2026_02_04_16_00')
            .insert(items)
            .select();
        if (error)
            throw error;
        return data || [];
    }
    static async updateStatus(id, status, errorDetails) {
        const updates = {
            status,
            processed_date: new Date().toISOString()
        };
        if (errorDetails) {
            updates.error_details = errorDetails;
        }
        const { data, error } = await supabase
            .from('bulk_uploads_2026_02_04_16_00')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
}
// Tariff Rates API
export class TariffRatesAPI {
    static async list() {
        const { data, error } = await supabase
            .from('tariff_rates_2026_02_04_16_00')
            .select('*')
            .eq('is_active', true)
            .order('country');
        if (error)
            throw error;
        return data || [];
    }
    static async create(rate) {
        const { data, error } = await supabase
            .from('tariff_rates_2026_02_04_16_00')
            .insert([rate])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async update(id, updates) {
        const { data, error } = await supabase
            .from('tariff_rates_2026_02_04_16_00')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async delete(id) {
        const { error } = await supabase
            .from('tariff_rates_2026_02_04_16_00')
            .update({ is_active: false })
            .eq('id', id);
        if (error)
            throw error;
    }
    static async getByCountry(country) {
        const { data, error } = await supabase
            .from('tariff_rates_2026_02_04_16_00')
            .select('*')
            .eq('country', country)
            .eq('is_active', true)
            .order('weight_slab_min');
        if (error)
            throw error;
        return data || [];
    }
}
// System Configuration API
export class SystemConfigAPI {
    static async list() {
        const { data, error } = await supabase
            .from('system_config_2026_02_04_16_00')
            .select('*')
            .order('category', { ascending: true });
        if (error)
            throw error;
        return data || [];
    }
    static async getByKey(key) {
        const { data, error } = await supabase
            .from('system_config_2026_02_04_16_00')
            .select('*')
            .eq('config_key', key)
            .single();
        if (error)
            throw error;
        return data;
    }
    static async update(key, value, updatedBy) {
        const { data, error } = await supabase
            .from('system_config_2026_02_04_16_00')
            .update({
            config_value: value,
            updated_at: new Date().toISOString(),
            updated_by: updatedBy
        })
            .eq('config_key', key)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async create(config) {
        const { data, error } = await supabase
            .from('system_config_2026_02_04_16_00')
            .insert([config])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
}
// Marketer Performance API
export class MarketerPerformanceAPI {
    static async list() {
        const { data, error } = await supabase
            .from('marketer_performance_2026_02_04_16_00')
            .select(`
        *,
        admin_users_2026_02_04_16_00!marketer_id (
          full_name,
          email
        )
      `)
            .order('month_year', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async getByMarketer(marketerId) {
        const { data, error } = await supabase
            .from('marketer_performance_2026_02_04_16_00')
            .select('*')
            .eq('marketer_id', marketerId)
            .order('month_year', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async create(performance) {
        const { data, error } = await supabase
            .from('marketer_performance_2026_02_04_16_00')
            .insert([performance])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async update(id, updates) {
        const { data, error } = await supabase
            .from('marketer_performance_2026_02_04_16_00')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async getStats() {
        const { data, error } = await supabase
            .from('marketer_performance_2026_02_04_16_00')
            .select('*');
        if (error)
            throw error;
        const totalLeads = data?.reduce((sum, p) => sum + p.leads_generated, 0) || 0;
        const totalConversions = data?.reduce((sum, p) => sum + p.conversions, 0) || 0;
        const totalRevenue = data?.reduce((sum, p) => sum + p.revenue_generated, 0) || 0;
        const avgConversionRate = data?.length ?
            data.reduce((sum, p) => sum + p.conversion_rate, 0) / data.length : 0;
        return {
            totalLeads,
            totalConversions,
            totalRevenue,
            avgConversionRate,
            totalMarketers: data?.length || 0
        };
    }
}
// Customer Service Interactions API
export class CustomerServiceAPI {
    static async list() {
        const { data, error } = await supabase
            .from('customer_service_interactions_2026_02_04_16_00')
            .select(`
        *,
        admin_users_2026_02_04_16_00!agent_id (
          full_name,
          email
        )
      `)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async getByAgent(agentId) {
        const { data, error } = await supabase
            .from('customer_service_interactions_2026_02_04_16_00')
            .select('*')
            .eq('agent_id', agentId)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    static async create(interaction) {
        const { data, error } = await supabase
            .from('customer_service_interactions_2026_02_04_16_00')
            .insert([interaction])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async update(id, updates) {
        const updateData = { ...updates };
        // Auto-calculate response time if resolving
        if (updates.status === 'resolved' && !updates.resolved_at) {
            updateData.resolved_at = new Date().toISOString();
        }
        const { data, error } = await supabase
            .from('customer_service_interactions_2026_02_04_16_00')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    static async getStats() {
        const { data, error } = await supabase
            .from('customer_service_interactions_2026_02_04_16_00')
            .select('*');
        if (error)
            throw error;
        const total = data?.length || 0;
        const open = data?.filter(i => i.status === 'open').length || 0;
        const resolved = data?.filter(i => i.status === 'resolved').length || 0;
        const avgRating = data?.filter(i => i.satisfaction_rating)
            .reduce((sum, i, _, arr) => sum + (i.satisfaction_rating || 0) / arr.length, 0) || 0;
        const byType = {};
        data?.forEach(interaction => {
            byType[interaction.interaction_type] = (byType[interaction.interaction_type] || 0) + 1;
        });
        return {
            total,
            open,
            resolved,
            avgRating: Math.round(avgRating * 10) / 10,
            byType,
            resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
        };
    }
}
// Dashboard Statistics API
export class AdminDashboardAPI {
    static async getOverviewStats() {
        try {
            const [userStats, bulkUploads, tariffRates, interactions] = await Promise.all([
                AdminUsersAPI.getStats(),
                BulkUploadAPI.list(),
                TariffRatesAPI.list(),
                CustomerServiceAPI.getStats()
            ]);
            const recentUploads = bulkUploads.slice(0, 5);
            const completedUploads = bulkUploads.filter(u => u.status === 'completed').length;
            const processingUploads = bulkUploads.filter(u => u.status === 'processing').length;
            return {
                users: userStats,
                uploads: {
                    total: bulkUploads.length,
                    completed: completedUploads,
                    processing: processingUploads,
                    recent: recentUploads
                },
                tariffs: {
                    total: tariffRates.length,
                    countries: [...new Set(tariffRates.map(t => t.country))].length
                },
                customerService: interactions
            };
        }
        catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    }
}

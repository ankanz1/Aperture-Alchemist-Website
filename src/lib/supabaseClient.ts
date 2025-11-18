// src/lib/supabaseClient.ts
// NOTE: Supabase integration removed/disabled.
// This stub keeps existing imports working but returns empty results.
// If you want to re-enable Supabase, replace this file with a real client using
// `createClient` from '@supabase/supabase-js' and add your keys back to `.env`.

type QueryResult = { data: any[] | null; error: any | null };

const warn = () => console.warn('[supabase stub] Database access is disabled.');

const stubFrom = (tableName?: string) => ({
	select: async (_sel?: string) : Promise<QueryResult> => {
		warn();
		return { data: [], error: null };
	},
	order: function() { return this; },
	limit: function() { return this; }
});

export const supabase = {
	from: stubFrom,
	storage: {
		from: (_bucket: string) => ({
			// keeps signature similar to real API
			getPublicUrl: (_path: string) => ({ publicURL: '' })
		})
	}
};

export default supabase;

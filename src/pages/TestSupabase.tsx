import React from 'react';

const TestSupabase: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Database Disabled</h2>
      <p className="text-white/80">Supabase database access has been removed in this build. The test page is disabled to avoid exposing credentials or errors.</p>
    </div>
  );
};

export default TestSupabase;

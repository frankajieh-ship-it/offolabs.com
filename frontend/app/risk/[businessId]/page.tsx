import RiskDashboard from '@/components/RiskDashboard';

export default function RiskPage({
  params,
}: {
  params: { businessId: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <RiskDashboard businessId={params.businessId} />
      </div>
    </main>
  );
}

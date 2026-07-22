import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAccess } from '@lala/shared/lib/roles';

export const dynamic = 'force-dynamic';

export default async function DeliveryLayout({ children }: { children: React.ReactNode }) {
  const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL!;
  const me = await getAccess();
  if (!me) redirect(`/login?next=${encodeURIComponent('/delivery')}`);
  if (me.role !== 'delivery' && !me.isApprover) redirect(serviceUrl);
  return (
    <>
      <header className="staff-header">
        <div className="wrap header-inner">
          <span className="staff-brand">Lala · 배송</span>
          <nav className="staff-nav">
            <Link href="/delivery">배송</Link>
            <Link href={`${serviceUrl}/looks`}>고객앱</Link>
          </nav>
        </div>
      </header>
      <main className="wrap">{children}</main>
    </>
  );
}

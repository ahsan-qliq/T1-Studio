import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Global page background */}
      <Image
        src="/assets/images/Home.webp"
        alt=""
        fill
        sizes="100vw"
        className="fixed inset-0 -z-10 object-cover"
        aria-hidden="true"
      />
      {/* <Navbar /> */}
      {children}
      <Footer />
    </div>
  );
}

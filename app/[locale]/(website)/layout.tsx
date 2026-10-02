import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-hidden">
      {/* Global page background — fixed wrapper keeps the image from scrolling */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <Image
          src="/assets/images/Home.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

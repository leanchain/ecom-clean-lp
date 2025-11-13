import BigSound from '@/components/sections/big-sound';
import ProductFeatures from '@/components/sections/product-features';
import ProductIntro from '@/components/sections/product-intro';
import Testimonials from '@/components/sections/product-testimonials';
import ServiceFeatures from '@/components/sections/service-features';
import ProductDetail from '@/components/pdp/ProductDetail';

export default function ProductPage() {
  return (
    <>
      <ProductDetail />
      <ProductIntro />
      <BigSound />
      <Testimonials />
      <ProductFeatures />
      <ServiceFeatures />
    </>
  );
}

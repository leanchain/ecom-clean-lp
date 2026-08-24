import * as React from 'react';
import { CreditCard, Building, Smartphone, Coins, Wallet } from 'lucide-react';

import { cn } from '@/lib/utils';

const PaymentMethodIcon = React.forwardRef<
  SVGSVGElement,
  {
    type: string;
    className?: string;
  } & React.SVGProps<SVGSVGElement>
>(({ type, className = 'h-4 w-4', ...props }, ref) => {
  switch (type) {
    case 'acss_debit':
    case 'au_becs_debit':
    case 'bacs_debit':
    case 'nz_bank_account':
    case 'sepa_debit':
    case 'us_bank_account':
      return <Building ref={ref} className={cn(className)} {...props} />;
    case 'alipay':
    case 'amazon_pay':
    case 'kakao_pay':
    case 'naver_pay':
    case 'payco':
    case 'paypal':
    case 'revolut_pay':
    case 'samsung_pay':
    case 'twint':
    case 'wechat_pay':
      return <Smartphone ref={ref} className={cn(className)} {...props} />;
    case 'crypto':
      return <Coins ref={ref} className={cn(className)} {...props} />;
    case 'cashapp':
    case 'customer_balance':
      return <Wallet ref={ref} className={cn(className)} {...props} />;
    default:
      return <CreditCard ref={ref} className={cn(className)} {...props} />;
  }
});

PaymentMethodIcon.displayName = 'PaymentMethodIcon';

export { PaymentMethodIcon };

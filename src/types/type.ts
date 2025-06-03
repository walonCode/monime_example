export interface CreatePaymentCode {
  success: boolean;
  messages: string[];
  result: Result;
}

interface Result {
  id: string;
  name: string;
  mode: string;
  isActive: boolean;
  status: string;
  ussdCode: string;
  amount: Amount;
  customerTarget: CustomerTarget;
  financialTarget: FinancialTarget;
  allowedProviders: string[];
  progress: Progress;
  financialAccountId: string;
  expireTime: string;
  createTime: string;
  metadata: Metadata;
}

interface Metadata {
}

interface Progress {
  isCompleted: boolean;
  totalPaymentCount: number;
  totalPaymentSum: Amount;
}

interface FinancialTarget {
  expectedPaymentCount: number;
  expectedPaymentSum: Amount;
}

interface CustomerTarget {
  name: string;
  reference: string;
  payingPhoneNumber: string;
}

interface Amount {
  currency: string;
  value: number;
}
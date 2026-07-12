import { saleDeedClauses } from './sale_deed';
import {
  giftDeedClauses,
  mortgageClauses,
  releaseDeedClauses,
  leaseDeedClauses,
  leaveLicenseClauses,
  partitionDeedClauses,
  willClauses,
  poaClauses,
  agreementToSellClauses,
  developmentAgreementClauses,
} from './packs';

export const CLAUSE_PACKS = {
  sale_deed: saleDeedClauses,
  gift_deed: giftDeedClauses,
  mortgage: mortgageClauses,
  release_deed: releaseDeedClauses,
  lease_deed: leaseDeedClauses,
  leave_and_license: leaveLicenseClauses,
  partition_deed: partitionDeedClauses,
  will: willClauses,
  power_of_attorney: poaClauses,
  agreement_to_sell: agreementToSellClauses,
  development_agreement: developmentAgreementClauses,
};

export function getClausePack(documentType) {
  return CLAUSE_PACKS[documentType] || CLAUSE_PACKS.sale_deed;
}

export default CLAUSE_PACKS;

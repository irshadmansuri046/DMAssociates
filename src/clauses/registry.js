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
import { isSaleDeedType } from '../constants/documentTypes';

export const CLAUSE_PACKS = {
  sale_deed: saleDeedClauses,
  sale_deed_flat: saleDeedClauses,
  sale_deed_house: saleDeedClauses,
  sale_deed_farm_land: saleDeedClauses,
  sale_deed_plot: saleDeedClauses,
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
  if (isSaleDeedType(documentType)) return CLAUSE_PACKS.sale_deed;
  return CLAUSE_PACKS[documentType] || CLAUSE_PACKS.sale_deed;
}

export default CLAUSE_PACKS;

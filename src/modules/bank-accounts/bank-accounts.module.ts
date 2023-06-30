import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Module({
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
  ],
  exports: [
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
  ],
})
export class BankAccountsModule {}

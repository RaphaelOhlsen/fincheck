import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidadeEntitiesOwnerShipDto } from '../dto/validate-entities-ownership.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: ValidadeEntitiesOwnerShipDto) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),

      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),

      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
    ]);
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: { month: number; year: number; bankAccountId?: string },
  ) {
    const startDate = new Date(Date.UTC(filters.year, filters.month));
    const endDate = new Date(Date.UTC(filters.year, filters.month + 1));

    return this.transactionsRepo.findMany({
      where: {
        AND: [
          { userId },
          { bankAccountId: filters.bankAccountId },
          {
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
        ],
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, name, value, date, type } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepo.delete({ where: { id: transactionId } });

    return null;
  }
}

import { TransactionType } from '@prisma/client';

const initialCategories = [
  // Income
  { name: 'Salário', icon: 'salary', type: TransactionType.INCOME },
  { name: 'Freelance', icon: 'freelance', type: TransactionType.INCOME },
  { name: 'Outro', icon: 'other', type: TransactionType.INCOME },
  // Expense
  { name: 'Casa', icon: 'home', type: TransactionType.EXPENSE },
  { name: 'Alimentação', icon: 'food', type: TransactionType.EXPENSE },
  { name: 'Educação', icon: 'education', type: TransactionType.EXPENSE },
  { name: 'Lazer', icon: 'fun', type: TransactionType.EXPENSE },
  { name: 'Mercado', icon: 'grocery', type: TransactionType.EXPENSE },
  { name: 'Roupas', icon: 'clothes', type: TransactionType.EXPENSE },
  { name: 'Transporte', icon: 'transport', type: TransactionType.EXPENSE },
  { name: 'Viagem', icon: 'travel', type: TransactionType.EXPENSE },
  { name: 'Outro', icon: 'other', type: TransactionType.EXPENSE },
];

export default initialCategories;

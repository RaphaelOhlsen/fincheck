import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepo: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId },
      select: { id: true, name: true },
    });
  }

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}

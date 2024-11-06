import { Module } from '@nestjs/common';
import { BrandService } from './brands.service';
import { BrandController } from './brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models/brand.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandsModule {}
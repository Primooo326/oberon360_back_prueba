import { Module } from '@nestjs/common';
import { CountriesService } from './countries/countries.service';
import { DepartmentsService } from './departments/departments.service';
import { MunicipalitiesService } from './municipalities/municipalities.service';
import { MunicipalitiesController } from './municipalities/municipalities.controller';
import { DepartmentsController } from './departments/departments.controller';
import { CountriesController } from './countries/countries.controller';
import { DistrictsService } from './districts/districts.service';
import { DistrictsController } from './districts/districts.controller';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [
    CountriesService,
    DepartmentsService,
    MunicipalitiesService,
    DistrictsService,
  ],
  controllers: [
    MunicipalitiesController,
    DepartmentsController,
    CountriesController,
    DistrictsController,
  ],
})
export class LocationsModule {}

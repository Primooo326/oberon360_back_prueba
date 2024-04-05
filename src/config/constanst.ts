import { Type, applyDecorators } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger"
import { PageDto } from "src/dtos-globals/page.dto";

/**
 * pagination constants 
 */
export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description: "Successfully received model list",
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};

export const SP_DEFAULT = 'SP_DEFAULT'
const Jwt_secret = 'JWT_SECRET'

/**
 * auxiliar constant
 */
export const jwtConstanst = {
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiYXZhdGFyIjpudWxsLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsImxpY2Vuc2VfaWQiOjEsImlhdCI6MTY5ODg1Njg1MSwiZXhwIjoxNjk4ODkyODUxfQ.n87SNBViKIe7bAMiANCZ_UyeukDWaJCl_Yv2MLGej1E'
}
export const cors = require('cors');
import { Type, applyDecorators } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger"
import { PageDto } from "../dtos-globals/page.dto";

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

export const SP_OBERON360DEFAULT = 'SP_OBERON360DEFAULT';
export const SP_OBERON360WEB = 'SP_OBERON360WEB';
export const SP_OBERON360MOBILE = 'SP_OBERON360MOBILE';

export const cors = require('cors');
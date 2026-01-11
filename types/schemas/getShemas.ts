import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { OpenAPI3, ComponentsObject } from 'openapi-typescript';

// добавляет префиксы всем схемам
function addSchemasPrefix(prefix: string, openApiSchema: OpenAPI3): OpenAPI3 {
  const capitalizedPrefix = `${prefix[0].toUpperCase()}${prefix.slice(1)}`;
  if (!openApiSchema.components) return openApiSchema;
  if (!openApiSchema.components.schemas) return openApiSchema;
  if (!openApiSchema.paths) return openApiSchema;

  const schemas: ComponentsObject['schemas'] = {};
  // делаем схему с новыми именами
  for (const schema in openApiSchema.components.schemas) {
    schemas[`${capitalizedPrefix}${schema}`] =
      openApiSchema.components.schemas[schema];
  }
  openApiSchema.components.schemas = schemas;

  // ходим и менем schema по $ref
  function walk(obj: Record<string, any>) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object') {
        walk(value);
      } else {
        if (key === '$ref') {
          obj[key] = value.replace(/(\w+)$/, `${capitalizedPrefix}$1`);
        }
      }
    }
  }
  walk(openApiSchema);
  return openApiSchema;
}

function getSchema(url: string, name: string) {
  fetch(url)
    .then((r) => r.json())
    .then((file) => {
      const dest = path.resolve(__dirname, `${name}.json`);
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      const d = fs.openSync(dest, 'w');
      fs.writeFileSync(dest, JSON.stringify(addSchemasPrefix(name, file)));
      fs.closeSync(d);
    });
}

getSchema('http://localhost:3007/openapi', 'bff');
getSchema(
  'https://payment-bff.dev.elka.roscap.com/openapi/',
  'payment-bff',
);

export {};

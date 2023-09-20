export interface IAuditErrors {
  exercise?: string;
  msg: string;
}

type TType = "string" | "array" | "number" | "url" | "boolean";

export interface ISchemaItem {
  key: string;
  mandatory: boolean;
  type: TType;
  max_size?: number;
  allowed_extensions?: string[];
  enum?: string[];
  max_item_size?: number;
}

import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import { ColumnType } from 'antd/lib/table/interface';

export type ItemsEnum =
  | 'number'
  | 'text'
  | 'text-area'
  | 'image'
  | 'multi-images'
  | 'file'
  | 'check-box'
  | 'select'
  | 'primary-key'
  | 'foreign-key'
  | 'foreign-key-obj'
  | 'multi-foreign-key'
  | 'selectable-multi-foreign-key'
  | 'signable-multi-foreign-key'
  | 'html-editor'
  | 'date'
  | 'dynamic-list'
  | 'text-not-required'
  | 'no-thing'
  | 'rules';

export interface ItemType {
  type: ItemsEnum;
  columnType: ColumnType<any>;
  foreignKeyArr?: { value: number | string; title: React.ReactNode }[];
  trans?: boolean;
  demo?: boolean;
  hidden?: boolean;
  customFormItem?: React.ReactElement | { insert: React.ReactElement; update: React.ReactElement };
  ignore?: true | { update?: true; insert?: true };


  // make the field is not required in add & edit form
  required?: boolean;

  // Initial value section
  initialValueDataIndex?: string;
  getInitialValue?: (val: any) => any;

  dynamicListGenerator?: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[] }
  ) => React.ReactNode;
}

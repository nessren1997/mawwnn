import dynamic from 'next/dynamic';
import React from 'react';

const JoditEditor = dynamic(import('jodit-react'), {
  ssr: false,
});

const config = {
  readonly: false,
  disablePlugins: [
    'autofocus',
    'print',
    'table',
    'file',
    'video',
    'image',
  ],
} as any

export const HtmlEditor: React.FC<{
  value?: string,
  onChange?: (value: string) => void,
}> = ({ onChange, value = '' }) =>
    <JoditEditor
      value={value}
      config={config}
      onBlur={(nw: any) => {
        const { innerHTML } = ((nw as FocusEvent).target as HTMLDivElement);
        onChange && onChange(innerHTML)
      }}
    />

import exportFromJSON from 'export-from-json';

export const exportExcel = (data: any, fileName: string, exportType: 'json' | 'csv' | 'xls' | 'xml' | 'txt') => {
  exportFromJSON({ data, fileName, exportType } as any);
};

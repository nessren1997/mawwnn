import { UploadFile } from 'antd/lib/upload/interface';
import FileToBase64 from './file-to-base64';

export const filesToArray = async (
  files: UploadFile<any>[]
): Promise<string[]> =>
  await Promise.all(
    files.map(async (el) => {
      let res;
      if (el.originFileObj) res = await FileToBase64(el.originFileObj);
      else {
        let arr = el.url!.split('/');
        let tmp = `${arr[arr?.length - 2]}/${arr[arr?.length - 1]}`;
        res = tmp;
      }
      return res;
    })
  );

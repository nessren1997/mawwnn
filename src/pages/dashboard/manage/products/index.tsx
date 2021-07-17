import useTranslation from "next-translate/useTranslation";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, notification, Select, Space, Typography, Upload } from "antd";

import CRUDBuilder from "../../../../utils/CRUDBuilder/CRUDBuilder";
import { ItemType } from "../../../../utils/CRUDBuilder/types";

import {
  DeleteProductAsync,
  FetchDashProductsAsync,
  InsertProductAsync,
  selectProducts,
  selectProductsStatus,
  UpdatePricesAsync,
  UpdateProductAsync,
} from "../../../../redux/product";
import { GetServerSideProps } from "next";
import { FetchCategoriesAsync, selectCategories } from "../../../../redux/category";
import { FetchBrandsAsync, selectBrands } from "../../../../redux/brand";
import { Tag } from "../../../../models/tag";
import { FetchTagsAsync, selectTag } from "../../../../redux/tag";
import { Product, Product_Req } from "../../../../models";
import { filesToArray } from "../../../../utils/helpers/files-to-array";
import { DashboardAuthenticated } from "../../../../utils/helpers/dashboard-authenticated";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { RootState } from "../../../../redux/store";
import { exportExcel } from "../../../../utils/helpers/export_jsonToExcel";

// let products_objToPdf: any = [];

const mapper = async (req: any): Promise<Product_Req> => ({
  ...req,
  product_images: await filesToArray(req.product_images),
});

let prevPage: number[] = [];

const ManageProducts: FC = () => {
  const [state, setState] = useState<{ fileList: UploadFile<any>[]; uploading: boolean }>({ fileList: [], uploading: false });

  const products = useSelector(selectProducts);
  const { tags } = useSelector(selectTag);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const status = useSelector(selectProductsStatus);
  const { t } = useTranslation("dashboard");

  const {
    updatePrice: { status: updateStatus },
  } = useSelector((state: RootState) => state.Products);

  const { lang } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDashProductsAsync());
    dispatch(FetchCategoriesAsync());
    dispatch(FetchBrandsAsync());
    dispatch(FetchTagsAsync());
  }, [dispatch]);

  let page = 1;

  useEffect(() => {
    if (updateStatus === "data") {
      notification.success({
        message: "updated successfully",
      });
      dispatch(FetchDashProductsAsync());
    }
  }, [updateStatus]);

  const columnsProducts: ItemType[] = [
    {
      columnType: {
        title: t`id`,
        dataIndex: "id",
        fixed: "left",
        width: 100,
      },
      type: "primary-key",
    },
    {
      columnType: {
        title: t`name`,
        dataIndex: "name",
        width: 200,
      },
      type: "text",
      trans: true,
    },
    {
      columnType: {
        title: t`price`,
        dataIndex: "price",
        width: 200,
      },
      type: "number",
    },
    {
      columnType: {
        title: t`overview`,
        dataIndex: "overview",
        width: 300,
      },
      type: "html-editor",
      hidden: true,
      trans: true,
    },
    {
      columnType: {
        title: t`specifications`,
        dataIndex: "specifications",
        width: 400,
      },
      type: "html-editor",
      hidden: true,
      trans: true,
    },
    {
      columnType: {
        title: t`images`,
        dataIndex: "product_images",
        width: 250,
      },
      type: "multi-images",
    },
    {
      columnType: {
        title: t`is_visible`,
        dataIndex: "is_visible",
        width: 150,
      },
      type: "check-box",
    },
    {
      columnType: {
        title: t`rank`,
        dataIndex: "rank",
        width: 80,
      },
      type: "number",
    },
  ];

  const tmp: ItemType[] = [
    {
      columnType: {
        title: t`category`,
        dataIndex: "category_id",
        width: 200,
        render: (id: number) => (
          <Typography.Text>
            {lang === "ar"
              ? categories.find((el) => el.id === id)?.["name:ar"]
              : categories.find((el) => el.id === id)?.["name:en"]}
          </Typography.Text>
        ),
      },
      type: "foreign-key",
      foreignKeyArr: categories.map((el) => ({ value: el.id, title: lang === "ar" ? el["name:ar"] : el["name:en"] })),
    },
    {
      columnType: {
        title: t`brand`,
        dataIndex: "brand_id",
        width: 200,
        render: (id: number) => <Typography.Text>{brands.find((el) => el.id === id)?.name} </Typography.Text>,
      },
      type: "foreign-key",
      foreignKeyArr: brands.map((el) => ({ value: el.id, title: el.name })),
    },
    {
      columnType: {
        title: t`tags`,
        dataIndex: "product_tags",
        width: 250,
        render: (arr: Tag[]) => (
          <Select style={{ width: "100%" }} showSearch>
            {arr.map((el) => (
              <Select.Option key={el.id} value={el.id}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        ),
      },
      type: "signable-multi-foreign-key",
      foreignKeyArr: tags.map((el) => ({ value: el.name, title: el.name })),
    },
  ];

  return (
    <>
      <Space align="baseline" size="large">
        <Typography.Text>{t`change_prices`}</Typography.Text>
        <Upload
          onRemove={(file) => {
            setState((state) => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                ...state,
                fileList: newFileList,
              };
            });
          }}
          onChange={({ fileList }) => {
            setState((state) => ({
              ...state,
              fileList,
            }));
          }}
          beforeUpload={() => false}
          fileList={state.fileList}
          disabled={state.fileList.length > 0}
          accept=".xlsx"
        >
          <Button icon={<UploadOutlined />}>{t`Select_File`}</Button>
        </Upload>
        <Button
          type="primary"
          onClick={() => {
            const { fileList } = state;
            const formData = new FormData();
            setState((val) => ({ ...val, uploading: true }));
            formData.append("file", fileList[0].originFileObj as any);
            console.log(fileList[0].originFileObj);
            dispatch(UpdatePricesAsync(formData));
            setState((val) => ({ ...val, uploading: false }));
          }}
          disabled={state.fileList.length === 0}
          loading={updateStatus === "loading"}
          style={{ marginTop: 16 }}
        >
          {updateStatus === "loading" ? t`Uploading` : t`Start_Upload`}
        </Button>
        <Typography>
          <Typography.Text type="warning">
            <ul>
              <li>{t`if you upload`}</li>
              <li>{t`the file`}</li>
            </ul>
          </Typography.Text>
        </Typography>
      </Space>
      <Col span={24}>
        <Button onClick={() => exportExcel(products, "products", "xls")}>{t`export_as_excel`}</Button>
      </Col>
      <CRUDBuilder
        lang={lang === "en" ? "en" : "ar"}
        items={products.map((el) => ({ ...el, product_images: el.product_images.map((el) => el.image_path) }))}
        loading={status === "loading"}
        AddAsync={(el) => InsertProductAsync({ product: el.item })}
        UpdateAsync={(el) => UpdateProductAsync({ id: el.id, product: el.item })}
        DeleteAsync={(el) => DeleteProductAsync({ id: el.id })}
        itemsHeader={[...columnsProducts, ...tmp]}
        Mapper={mapper}
        // getPage={(page) => {
        //   let ind = prevPage.findIndex((el) => el === page);
        //   ind === -1 && dispatch(FetchPaginatedProductsAsync(page));
        //   prevPage.push(page);
        // }}
        // totalItems={products.data.length + 1}
        // showSizeChanger={false}
      />
    </>
  );
};
export default ManageProducts;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;

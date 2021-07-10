import { Button, Form, notification, Popconfirm, Row, Table, Modal, Typography, DatePicker, Image, Carousel } from "antd";
import { CheckSquareFilled, CloseSquareFilled, DeleteFilled, EditFilled, EditOutlined } from "@ant-design/icons";
import { ColumnsType, ColumnType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { MapIntoFormItems } from "./MapIntoFormItems";
import { AppThunk } from "../../redux/store";
import { ItemType } from "./types";
import { getColumnSearchProps } from "./CustomComponent/searchProperties";

import "./style.less";
import useTranslation from "next-translate/useTranslation";

const { Text, Paragraph } = Typography;

interface CRADBuilderProps {
  table_id?: string;
  itemsHeader: ItemType[];
  items: any[];
  getPage?: (page: any, pageSize: any) => void;
  totalItems?: number;
  showSizeChanger?: boolean;
  loading: boolean;
  lang: "ar" | "en";
  AddAsync?: (req: { item: any }) => AppThunk;
  DeleteAsync?: (req: { id: number }) => AppThunk;
  UpdateAsync?: (req: { id: number; item: any }) => AppThunk;
  Mapper?: (old: any) => any;
}

const CRUDBuilder: React.FC<CRADBuilderProps> = ({
  table_id,
  AddAsync,
  DeleteAsync,
  UpdateAsync,
  Mapper,
  getPage,
  totalItems,
  showSizeChanger = true,
  items,
  itemsHeader,
  lang,
  loading,
}) => {
  const [columns, setColumns] = useState<ColumnsType<any>>();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [resultItems, setResultItems] = useState<any[]>([]);
  const { t } = useTranslation("dashboard");

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    setTableHeader(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultItems, itemsHeader, lang]);

  //set search button for searchable fields
  const setTableHeader = (lang: "ar" | "en") => {
    if (resultItems && resultItems.length > 0) {
      //work on trans and put a['key'] prop and search for searchable fields
      let res: ColumnsType<any> = [];
      itemsHeader.forEach((el, ind) => {
        if (!el.hidden) {
          const tmp = el.columnType.dataIndex!.toString();
          const dataindex = el.trans ? tmp + ":" + lang : tmp;
          let col: ColumnType<any> = {};
          switch (el.type) {
            case "primary-key":
              col = { ...el.columnType, ...getColumnSearchProps(dataindex), sorter: (a, b) => a.id - b.id };
              break;
            case "text":
            case "number":
            case "primary-key":
              col = {
                render: (val) => <Text>{val}</Text>,
                ...el.columnType,
                ...getColumnSearchProps(dataindex),
              };
              break;

            case "text-area":
              col = {
                render: (val) => (
                  <Paragraph title={val} ellipsis={{ rows: 2 }}>
                    {val}
                  </Paragraph>
                ),
                ...el.columnType,
                ...getColumnSearchProps(dataindex),
              };
              break;

            case "date":
              col = {
                render: (val) => <DatePicker value={moment(val)} inputReadOnly />,
                ...el.columnType,
              };
              break;

            case "html-editor":
              col = {
                render: (val) => <div dangerouslySetInnerHTML={{ __html: val }} />,
                ...el.columnType,
                ...getColumnSearchProps(dataindex),
              };
              break;

            case "image":
              col = {
                render: (val) => <Image src={val} preview={false} />,
                ...el.columnType,
              };
              break;

            case "multi-images":
              col = {
                render: (val: string[]) => (
                  <Carousel draggable>
                    {val.map((el) => (
                      <Image key={el} src={el} preview={false} />
                    ))}
                  </Carousel>
                ),
                ...el.columnType,
              };
              break;

            case "foreign-key-obj":
              col = {
                ...el.columnType,
              };
              break;

            case "check-box":
              col = {
                render: (val: boolean | 0 | 1 | "0" | "1") =>
                  Number(val) ? (
                    <CheckSquareFilled style={{ color: "green", fontSize: 40 }} />
                  ) : (
                    <CloseSquareFilled style={{ color: "#c0392b", fontSize: 40 }} />
                  ),
                ...el.columnType,
              };
              break;

            case "multi-foreign-key":
              col = {
                ...el.columnType,
              };
              break;

            default:
              col = {
                ...el.columnType,
              };
              break;
          }
          res.push({ ...col, dataIndex: dataindex, key: `TH${ind}` });
        }
      });

      //set initial values for edit form
      const displayModal = (id: number) => {
        if (resultItems && resultItems.length > 0) {
          setEditModalVisible(true);
          let item = resultItems.find((el) => el.id === id);
          let res = Object.assign({}, {} as any);
          itemsHeader.forEach((el) => {
            const from_dataIndex = el.initialValueDataIndex ?? el.columnType.dataIndex!.toString();
            const to_dataIndex = el.columnType.dataIndex!.toString();

            if (!el.demo)
              if (el.getInitialValue) {
                res[to_dataIndex] = el.getInitialValue(item[from_dataIndex]);
              }
            if (el.type === "date") {
              res[to_dataIndex] = moment(item[from_dataIndex]);
            } else if (el.type === "foreign-key-obj") {
              res[to_dataIndex] = item[from_dataIndex].id;
            } else if (el.type === "selectable-multi-foreign-key") {
            } else if (el.type === "signable-multi-foreign-key") {
              res[to_dataIndex] = item[from_dataIndex].map((el: any) => el.name); // this is for mawn pls delete it after we project end
            } else if (el.type === "foreign-key") {
              res[to_dataIndex] = item[from_dataIndex];
            } else if (el.type === "multi-images") {
              res[to_dataIndex] = (item[from_dataIndex] as string[]).map((el) => ({
                uid: el,
                name: el,
                url: el,
              }));
            } else {
              if (el.trans) {
                res[to_dataIndex + ":ar"] = item[from_dataIndex + ":ar"];
                res[to_dataIndex + ":en"] = item[from_dataIndex + ":en"];
              } else res[to_dataIndex] = item[from_dataIndex];
            }
          });
          console.log(res);

          form.setFieldsValue(res);
        }
      };

      //edit and delete buttons
      (UpdateAsync || DeleteAsync) &&
        res.push({
          title: t`operations`,
          dataIndex: "id",
          key: "operations",
          fixed: "right",
          width: 120,
          render: (id: number) => (
            <React.Fragment>
              {UpdateAsync ? (
                <Button type="link" onClick={() => displayModal(id)} title={t`edit`}>
                  <EditFilled style={{ fontSize: 20 }} />
                </Button>
              ) : null}

              {DeleteAsync ? (
                <Popconfirm
                  onConfirm={() => {
                    dispatch(DeleteAsync({ id }));
                  }}
                  title={t`delete-confirm`}
                >
                  <Button type="link">
                    <DeleteFilled style={{ fontSize: 20, color: "red" }} title="Delete" />
                  </Button>
                </Popconfirm>
              ) : null}
            </React.Fragment>
          ),
          align: "center",
        });
      setColumns(res);
    }
  };

  //edit submeted
  const onFinishEdit = async (values: any) => {
    const tmp = items.find((el) => el.id === values.id);
    if (tmp) {
      if (UpdateAsync) {
        let item: any;
        if (Mapper) item = await Mapper(values);
        else item = values;
        dispatch(UpdateAsync({ item, id: values.id }));
        setEditModalVisible(false);
      }
    } else notification.error({ message: "Error: Not Found" });
  };

  //add submeted
  const onFinishAdd = async (values: any) => {
    if (AddAsync) {
      let item: any;
      if (Mapper) item = await Mapper(values);
      else item = values;
      dispatch(AddAsync({ item }));
      setAddModalVisible(false);
    }
  };

  //assign a ['key'] prop for each element to remove key warning
  useEffect(() => {
    let res = items.map((el, ind) => {
      var tmp = Object.assign({}, el);
      tmp.key = ind;
      return tmp;
    });
    setResultItems(res);
  }, [items]);

  // add button
  const addButton = AddAsync
    ? () => (
        <Button size="large" type="primary" onClick={() => setAddModalVisible(true)}>
          {t`add`}
        </Button>
      )
    : undefined;

  //return :)
  return (
    <React.Fragment>
      <Table
        id={table_id}
        title={addButton}
        footer={addButton}
        bordered
        dataSource={resultItems}
        columns={columns}
        loading={loading}
        scroll={{ x: 250, y: "75vh" }}
        pagination={{
          defaultPageSize: 80,
          hideOnSinglePage: true,
          total: totalItems,
          onChange: (page, pageSize) => getPage && getPage(page, pageSize),
          showSizeChanger: showSizeChanger,
        }}
      />
      {AddAsync ? (
        <Modal
          width={800}
          footer={false}
          title={
            <React.Fragment>
              <EditOutlined />
              {t`add`}
            </React.Fragment>
          }
          visible={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
        >
          <Form encType="multipart/form-data" scrollToFirstError={true} name="Add" layout="vertical" onFinish={onFinishAdd}>
            <Row gutter={16}>
              <MapIntoFormItems itemsHeader={itemsHeader} />
            </Row>
            <Form.Item>
              <Button size="large" htmlType="submit" type="primary">
                {t`add`}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
      {UpdateAsync ? (
        <Modal
          width={800}
          footer={false}
          title={
            <React.Fragment>
              <EditOutlined />
              {t`edit`}
            </React.Fragment>
          }
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
        >
          <Form scrollToFirstError={true} name="Edit" layout="vertical" form={form} onFinish={onFinishEdit}>
            <Row gutter={16}>
              <MapIntoFormItems form={form} itemsHeader={itemsHeader} />
            </Row>
            <Form.Item>
              <Button size="large" htmlType="submit" type="primary">
                {t`edit`}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default CRUDBuilder;

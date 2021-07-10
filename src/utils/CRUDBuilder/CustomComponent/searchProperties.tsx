import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Checkbox } from "antd";
import { ColumnType } from "antd/es/table/interface";
import React from "react";

export const getColumnSearchProps: (dataindex: string) => ColumnType<any> = (dataIndex: string) => {

    let match = false;

    let searchInput: Input | null = null

    const handleSearch = (confirm: () => void) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (arr: string[]) => void, selectedKeys: string[], confirm: () => void, clearFilters: () => void }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(e) => searchInput = e}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Checkbox value={match} onChange={(val) => { match = val.target.checked; handleReset(clearFilters); }}>Match The Whole Word</Checkbox>
                <br />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ height: 'fit-content' }}
                    >
                        {'Search'}
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ height: 'fit-content' }}>
                        {'Reset'}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex as string]
                ? match ? (record[dataIndex] as string).toString().toLowerCase() === value.toString().toLowerCase() : (record[dataIndex] as string).toString().toLowerCase().includes(value.toString().toLowerCase())
                : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput?.select(), 100);
            }
        },
    }
};
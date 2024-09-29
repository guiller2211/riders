import { Link, View, Text, Button } from '../../../../atomic';
import type { OrdersHistoryBodyProps } from './OrderHistoryBody.types';
import { ColorUtils, FormatDate, IconBoxArrowUpRight, OrderData } from '@riders/ui';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { AppRoutes } from '@riders/types';
import { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';

const OrdersHistoryBody = (props: OrdersHistoryBodyProps) => {
  const { searchTerm, orders } = props;
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);

  const initFilters = () => {
    setFilters({
      numOrder: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      createdDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      totalPrice: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    setGlobalFilterValue('');
  };


  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let _filters = { ...filters };
    
    _filters['global'] = { value, matchMode: FilterMatchMode.CONTAINS }; 
    
    setFilters(_filters);
    setGlobalFilterValue(value);
};


  const renderHeader = () => {
    return (
      <View direction='row'>
        <Button type="button" onClick={clearFilter} >Borrar</Button>
        <View.Item gapBefore='auto'>
          <IconField iconPosition="left">
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </IconField>
        </View.Item>
      </View>
    );
  };
  const clearFilter = () => {
    initFilters();
  };
  const header = renderHeader();

  const statusBodyTemplate = (orders: OrderData) => {
    return <Tag value={orders.status} severity={ColorUtils.badgeColor(orders?.status!)}></Tag>;
  };

  const renderNumOrder = (rowData: OrderData) => {
    return (
      <View.Item columns="auto" grow>
        <Link
          icon={IconBoxArrowUpRight}
          variant="plain"
          href={`${AppRoutes.Orders}/${rowData.numOrder}`}
        >
          <Text color="primary" variant="caption-1">{rowData.numOrder}</Text>
        </Link>
      </View.Item>
    );
  };

  const renderDate = (rowData: OrderData) => {
    const formattedDate = FormatDate.format(rowData.createdDate);
    
    return (
      <View.Item columns="auto" grow>
        <Text variant="caption-1">{`${formattedDate}`}</Text>
      </View.Item>
    );
  };


  return (
    <View>
      <DataTable
        header={header}
        value={orders}
        filters={filters}
        globalFilterFields={['numOrder', 'createdDate', 'status', 'totalPrice.value']}
        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem' }}>
        <Column field="numOrder" body={renderNumOrder} header="id" sortable style={{ width: '25%' }}></Column>
        <Column field="createdDate" body={renderDate} header="Fecha de creacion" sortable style={{ width: '25%' }}></Column>
        <Column field="status" header="Estatus" body={statusBodyTemplate} sortable style={{ width: '25%' }} ></Column>
        <Column field="totalPrice.value.centsAmount" header="Total" sortable style={{ width: '25%' }} ></Column>
      </DataTable>
    </View>
  );
};

export default OrdersHistoryBody;

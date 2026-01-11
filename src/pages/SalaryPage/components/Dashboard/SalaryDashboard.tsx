import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BackTop,
  Layout,
  useDashboardFilter,
  useNonInitialEffect,
  Paginator,
  NoResults,
} from '@src/domrf-ui';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FooterPanel } from './FooterPanel/FooterPanel';
import { FiltersPanelSalary } from './FiltersPanelSalary/FiltersPanelSalary';
import SalaryTable from './SalaryTable/SalaryTable';
import { StatusTabs } from './StatusTabs/StatusTabs';
import { InfoFilters } from './InfoFilters/InfoFilters';
import styles from './SalaryDashboard.module.scss';

import { useSalaryDashboard } from './useSalaryDashboard';
import {
  Filters,
  resetFilters,
  updateFilters,
} from '@src/redux/SalaryRegistry/SalaryRegistrySlice';
import { useApiSelector } from '@redux/helpers';

export function SalaryDashboard() {
  console.log('SalaryDashboard')
  const { filters: storedFilters, saveFilterInLocalStorage } =
    useDashboardFilter<Filters>({
      fieldLocalStorage: 'salary_dashboardFilter',
    });

  const {
    rows,
    heading,
    isLoading,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    selectedFiltersCount,
    handlePageSizeChange,
    handlePageNumber,
    salaryDashboardRef,
    scrollTopDashboard,
    statusesInfoArray,
    signVerificationInfo,
    tabs,
  } = useSalaryDashboard();

  console.log('rows', rows);

  const dispatch = useDispatch();

  const { data, filters, total } = useApiSelector(
    (state) => state.salaryRegistry
  );

  useEffect(() => {
    if (!storedFilters) {
      dispatch(resetFilters(['ALL']));
    } else { dispatch(updateFilters(storedFilters)) }
  }, []);

  useNonInitialEffect(() => {
    saveFilterInLocalStorage(filters)
  }, [filters]);

  const tablewrapperClassName = classNames(styles['table-wrapper'], {
    [styles['table-wrapper_no-results']]: !rows?.length,
  });

  return (
    <div className={styles.dashboard} ref={salaryDashboardRef}>
      <Layout.Box>
        {/* <FiltersPanelSalary statusesInfo={statusesInfoArray} />
        <StatusTabs tabs={tabs} />
        <InfoFilters
          totalAmount={total}
          selectedFiltersCount={selectedFiltersCount}
        /> */}

        <SalaryTable
          table={{
            heading,
            isLoading,
            rows,
            columnPinning: {
              left: ['select-col'],
            },
            sorting,
            setSorting,
            rowSelection,
            setRowSelection,
          }}
          tableWrapperClassName={tablewrapperClassName}
          noResultsComponent={
            <div className={styles['no-results']}>
              <NoResults resetFilters={() => dispatch(resetFilters(['ALL']))} />
            </div>
          }
        />

        {/* {!!data?.length && (
          <Paginator
            totalCount={total || 0}
            pageSize={filters?.pageSize}
            setPageSize={handlePageSizeChange}
            pageNumber={filters?.pageNumber}
            setPageNumber={handlePageNumber}
            hideBtnAll
            pageSizeButtons={[
              {
                title: '25',
                pageSize: 25
              },
              {
                title: '50',
                pageSize: 50
              },
              {
                title: '100',
                pageSize: 100
              },
            ]}
          />
        )} */}
      </Layout.Box>

      {/* <FooterPanel
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        referenceRef={salaryDashboardRef}
        selectedStatusTab={filters?.statusTab ? filters.statusTab[0] : 'ALL'}
        signVerificationInfo={signVerificationInfo}
      /> */}
      {scrollTopDashboard > 0 &&
        ReactDOM.createPortal(
          <BackTop right={0} marginRight={0} />,
          salaryDashboardRef.current as HTMLElement
        )}
    </div>
  );
}

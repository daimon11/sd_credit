import {
  RowSelectionState,
  SortingState,
  useDashboardFilter,
  useNonInitialEffect,
  useOrganizations,
} from '@src/domrf-ui';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Filters,
  resetFilters,
  updateFilters,
  setPagination,
} from '@src/redux/SalaryRegistry/SalaryRegistrySlice';
import { useApiSelector } from '@redux/helpers';
import { SignVerificationRequestBody } from '@src/types/Sign';
import {
  getMappedTabsArray,
  filtersCountReducer,
} from '@pages/SalaryPage/components/Dashboard/helpers';
import {
  FORCE_OPEN_SIGNING_PAYCONTROL_PARAM,
  OPEN_SIGNING_PAYCONTROL_MODAL_PARAM,
} from '@src/components/Signing/components/Submit PayControlModal/consts';

import {
  useGetRegistryQuery,
  useSignVerificationQuery,
  useGetStatusesCountQuery,
} from '@redux/SalaryRegistry/SalaryRegistryApi';
import { SalaryDataRequestQuery, SalaryStatuses } from '@src/types/Salary';

import { isErrorForOpenSigningPayControlModal } from '@pages/SalaryPage/helpers/isErrorForOpenSigningPayControlModal';

import { getHeaders } from '@pages/SalaryPage/components/Dashboard/SalaryTable/helpers/getHeaders';
import { useSigningActions } from '@src/redux/Signing/SigningSlice';
import { mockSalaryCardData } from '@pages/SalaryPage/components/Dashboard/mockData';

export function useSalaryDashboard() {
  const [scrollTopDashboard, setScrollTopDashboard] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const salaryDashboardRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, filters, isLoading } = useApiSelector(
    (state) => state.salaryRegistry
  );

  const [sorting, setSorting] = useState<SortingState>([
    { id: filters?.sortField, desc: filters?.sortDescending },
  ]);

  const { stagedOrganizationId, isSigningPayControlModalShown } = useApiSelector(
    (state) => state.signing);

  const state = useOrganizations();
  const currentOrganizationId = state?.selected?.id;
  useEffect(() => {
    setRowSelection({});
  }, [filters]);

  const { filters: storedFilters, saveFilterInLocalStorage } =
    useDashboardFilter<Filters>({
      fieldLocalStorage: 'salary_dashboardFilter',
    });

  const rows = useMemo(() => data?.length ? data : mockSalaryCardData, [data, isLoading]);

  console.log('rows', rows);
  console.log('data', data);
  console.log('mockSalaryCardData', mockSalaryCardData);

  const prevSorting = useRef(sorting);

  useEffect(() => {
    if (salaryDashboardRef.current) {
      setScrollTopDashboard(
        salaryDashboardRef.current.getBoundingClientRect().top + window.scrollY
      );
    }
  }, [salaryDashboardRef]);

  useEffect(() => {
    if (prevSorting.current !== sorting) {
      const [{ desc: sortDescending, id: sortField } = {}] = sorting || [];
      dispatch(updateFilters({ sortField, sortDescending }));
    }
  }, [sorting]);

  useEffect(() => {
    if (!storedFilters) {
      dispatch(resetFilters(['ALL']));
    } else {
      dispatch(updateFilters(storedFilters));
    }
  }, []);

  const registryFilters = useMemo<Omit<Required<SalaryDataRequestQuery>, 'organizationId' | 'statuses'>>(() => {
    const { statusesFilters, statusTab, ...newObj } = filters || {};

    const statuses =
      statusTab?.[0] === 'ALL' ? statusesFilters : (statusTab as SalaryStatuses[]);

    return {
      statuses,
      ...newObj,
    };
  }, [filters]);

  const registry = useGetRegistryQuery(
    {
      registryFilters,
      organizationId: currentOrganizationId || '',
    },
    {
      skip: !currentOrganizationId,
      refetchOnMountOrArgChange: true,
    }
  );

  const documents = useMemo<SignVerificationRequestBody[]>(() => {
    if (!registry.data || !state?.selected?.id) {
      return [];
    }

    return registry.data.salaryListDtos.reduce(
      (acc: SignVerificationRequestBody[], { id, status }) => {
        if (status === 'FOR_SIGNING' && Object.keys(rowSelection).includes(id)) {
          acc.push({
            docId: id,
            docType: 'SALARY_LIST',
            legalEntityId: state.selected.id,
            ruleName: 'SALARY_LIST',
          });
        }
        return acc;
      },
      []
    );
  }, [registry, state, rowSelection]);

  // const { data: signVerificationInfo, error } = useSignVerificationQuery(
  //   documents,
  //   {
  //     skip: !documents?.length,
  //   }
  // );

  const { setStagedOrganizationId, setIsSigningPayControlModalShown } =
    useSigningActions();

  useEffect(() => {
    // Отслеживает смену организации и обновляет флаг для отображения модалки SigningPayControlModal
    if (currentOrganizationId !== stagedOrganizationId || !currentOrganizationId) {
      dispatch(setStagedOrganizationId(currentOrganizationId));
      dispatch(setIsSigningPayControlModalShown(false));
    }
  }, [currentOrganizationId, stagedOrganizationId]);

  // const { data: statusesInfoArray } = useGetStatusesCountQuery(
  //   {
  //     organizationId: currentOrganizationId || '',
  //   },
  //   {
  //     skip: !currentOrganizationId,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  // const mappedTabsArray = getMappedTabsArray(statusesInfoArray);
  // const tabs: Array<SalaryStatuses | 'ALL'> = ['ALL', ...mappedTabsArray];

  // useEffect(() => {
  //   if (
  //     error &&
  //     isErrorForOpenSigningPayControlModal(error, isSigningPayControlModalShown)
  //   ) {
  //     // При получении ошибки 403 и code 2, вызвать модальное окно SigningPayControlModal с параметром toSelectScreen=false
  //     searchParams.set(OPEN_SIGNING_PAYCONTROL_MODAL_PARAM, 'true');
  //     searchParams.set(FORCE_OPEN_SIGNING_PAYCONTROL_PARAM, 'true');
  //     setSearchParams(searchParams);
  //     // фиксируем что уже показывали модалку пользователю с выбранной организацией
  //     dispatch(setIsSigningPayControlModalShown(true));
  //   }
  // }, [error]);

  // useNonInitialEffect(() => {
  //   saveFilterInLocalStorage(filters);
  // }, [filters]);

  const heading = getHeaders();

  // const selectedFiltersCount = filtersCountReducer(filters);

  // function handlePageSizeChange(value: number) {
  //   dispatch(setPagination({ name: 'pageSize', value }));
  //   window.scrollTo(0, 0);
  // }

  // function handlePageNumber(value: number) {
  //   dispatch(setPagination({ name: 'pageNumber', value }));
  //   window.scrollTo(0, 0);
  // }

  return {
    rows,
    heading,
    isLoading,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    // selectedFiltersCount,
    // handlePageSizeChange,
    // handlePageNumber,
    salaryDashboardRef,
    scrollTopDashboard,
    // mappedTabsArray,
    // statusesInfoArray,
    // signVerificationInfo,
    // tabs,
  };
}


// rows
// heading
// isLoading
// sorting
// setSorting
// rowSelection
//     setRowSelection,
// salaryDashboardRef
// scrollTopDashboard
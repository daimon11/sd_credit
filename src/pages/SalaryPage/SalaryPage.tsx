import React, { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  Layout,
  SelectOrganizationWrapper,
  Title,
  useNotify
} from '@src/domrf-ui';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './SalaryPage.module.scss';
import { SalaryTabs } from './components/Dashboard/consts';
// import { DevelopmentStub } from './components/DevelopmentStub/DevelopmentStub';
// import { FileLoaderPopUp } from './components/FileLoader/FileLoaderPopUp/FileLoaderPopUp';
import { SalaryDashboard } from './components/Dashboard/SalaryDashboard';
import { useApiSelector } from '@redux/helpers';
import { toggleLoader } from '@redux/Files/FileSlice';
import { useGetUserInfoQuery } from '@redux/Client/ClientApi';
import { updateFio, updatePhone } from '@redux/Client/ClientSlice';
import { useLazyGetTemplateSalatyFileQuery } from '@src/redux/Files/FilesApi';
import { usePermission } from '@hooks/usePermission';
import { normalizePhoneNumber } from '@src/helpers/normalizePhoneNumber';
import { HintsModal } from '@src/externals/HintsModal/HintsModal';

export function SalaryPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const importParam = searchParams.get('import');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeDirectory, setActiveDirectory] = useState<SalaryTabs>(
    SalaryTabs.SALARY_SHEET,
  );
  const [buttonsGroupContent, setButtonsGroupContent] =
    useState<ReactNode>(null);
  const [pageContent, setPageContent] = useState<ReactNode>(null);
  const [download] = useLazyGetTemplateSalatyFileQuery();

  const { permission } = usePermission();
  // const { showLoader } = useApiSelector((state) => state.file);
  const { data: clietData } = useGetUserInfoQuery(undefined);
  const dispatch = useDispatch();

  const { notifyLoading, notifyStop, notificationNotify } = useNotify();
  const openFileLoader = () => {
    dispatch(toggleLoader(true));
    if (clietData) {
      dispatch(updateFio(clietData.fullName));
      dispatch(updatePhone(normalizePhoneNumber(clietData.phoneNumber)));
    }
  };

  const closeFileLoader = () => {
    dispatch(toggleLoader(false));
  };

  // const submitFileLoaderHandle = () => {
  //   closeFileLoader();
  // };

  const handleDownload = async () => {
    const notifyId = notifyLoading('Загрузка... ');
    try {
      await download().unwrap();
      notificationNotify({
        type: 'success',
        title: 'Загружено',
        autoClose: 5000
      });
    } catch (error) {
      console.error(error);
      notificationNotify({
        type: 'error',
        title: 'Ошибка при загрузке файла',
        autoClose: 5000,
      });
    } finally {
      notifyStop(notifyId);
    }
  };

  useEffect(() => {
    if (importParam) {
      dispatch(toggleLoader(true));
    }
  }, [importParam, dispatch]);

  useEffect(() => {
    if (activeDirectory === SalaryTabs.SALARY_SHEET) {
      setButtonsGroupContent(
        <div className={styles['table-page_buttons-wrapper_action-buttons']}>
          <Button
            size="s"
            theme="black"
            iconName="Share"
            onClick={() => {
              handleDownload().catch(console.error);
            }}
          >
            Шаблон ведомости
          </Button>
          <Button
            size="s"
            theme="green"
            iconName="Download"
            onClick={openFileLoader}
            disabled={!permission?.import}
          >
            Импорт
          </Button>
        </div>
      );
      setPageContent(<SalaryDashboard />);
    } else {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      setButtonsGroupContent(<></>);
      setPageContent(<DevelopmentStub />);
    }
  }, [activeDirectory, permission?.import]);

  return (
    <Layout className={styles['table-page_content']}>
      <div className={styles['table-page_header-wrapper']}>
        <Title type="h2" text="Зарплатный проект" />
        {/* TODO: скрыть табы в рамках ELKA-17188
                <div>
                    <span>
                        {Object.entries(SALARY_TABS_NAMES).map(
                        ([tabCode, tabName]) => (
                            <Button
                                key={tabCode}
                                theme={tabCode === activeDirectory ? 'black' : 'gray'}
                                size="s"
                                onClick={() => setActiveDirectory(tabCode as SalaryTabs)}
                            >
                                {tabName}
                            </Button>
                        ),
                            )}
                    </span>


                </div>*/}

        <div className={styles['table-page_buttons-container']}>
          <HintsModal serviceId="salary" />
          {buttonsGroupContent}
        </div>
      </div>
      {pageContent}
      {/* {showLoader && (
        <FileLoaderPopUp
          onCancel={closeFileLoader}
          onSubmit={submitFileLoaderHandle} />
      )} */}
    </Layout>
  );
}

export default function () {
  return (
    <SelectOrganizationWrapper requiredRights={['SALARY_LIST_VIEW']}>
      <SalaryPage />
    </SelectOrganizationWrapper>
  );
}

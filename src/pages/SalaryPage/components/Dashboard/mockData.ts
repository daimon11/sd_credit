import { SalaryCardDataResponseSuccess, SalaryCartStatuses } from '@src/types/SalaryCart';

const statuses: SalaryCartStatuses[] = [
  'DRAFT',
  'FOR_SIGNING',
  'SIGNING',
  'PARTIALLY_SIGNED',
  'PROCESSING',
  'EXECUTED',
  'PARTIALLY_EXECUTED',
  'REJECTED',
];

const deliveryTypes: Array<'ORGANIZATION' | 'BANK_OFFICE'> = ['ORGANIZATION', 'BANK_OFFICE'];
const tariffPlans: Array<'NAMED' | 'UNNAMED' | 'PREMIUM'> = ['NAMED', 'UNNAMED', 'PREMIUM'];

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];
const offices = ['Офис 1', 'Офис 2', 'Офис 3', 'Центральный офис', 'Филиал'];

const generateMockData = (): SalaryCardDataResponseSuccess[] => {
  const mockData: SalaryCardDataResponseSuccess[] = [];

  for (let i = 1; i <= 40; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const deliveryType = deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)];
    const tariffPlan = tariffPlans[Math.floor(Math.random() * tariffPlans.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const office = offices[Math.floor(Math.random() * offices.length)];

    const id = `mock-id-${i}`;
    const organizationId = `org-${Math.floor(Math.random() * 10) + 1}`;
    const registerNumber = `REG-${String(i).padStart(6, '0')}`;
    const salaryAgreement = `AGREEMENT-${String(i).padStart(4, '0')}`;
    const cardsCount = Math.floor(Math.random() * 100) + 1;

    const now = new Date();
    const sendDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const processingDate = status === 'EXECUTED' || status === 'PARTIALLY_EXECUTED' 
      ? new Date(sendDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      : null;

    const firstName = ['Иван', 'Петр', 'Сергей', 'Александр', 'Дмитрий', 'Андрей', 'Михаил'][
      Math.floor(Math.random() * 7)
    ];
    const lastName = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Соколов'][
      Math.floor(Math.random() * 7)
    ];
    const phone = `+7 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`;

    mockData.push({
      id,
      organizationId,
      status,
      registerNumber,
      salaryAgreement,
      sendDate: sendDate.toISOString(),
      cardsCount,
      cardType: {
        payment_system: 'MIR',
        tariff_plan: tariffPlan,
      },
      deliveryMethod: {
        delivery_type: deliveryType,
        delivery_office: deliveryType === 'BANK_OFFICE' ? office : null,
        delivery_city: deliveryType === 'BANK_OFFICE' ? city : null,
      },
      contactPerson: {
        fullName: `${firstName} ${lastName}`,
        phone,
      },
      bankComment: Math.random() > 0.7 ? `Комментарий банка для заявки ${i}` : null,
      processingDate: processingDate ? processingDate.toISOString() : null,
    });
  }

  return mockData;
};

export const mockSalaryCardData: SalaryCardDataResponseSuccess[] = generateMockData();

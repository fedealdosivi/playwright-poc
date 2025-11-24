export const ENV = {
  baseUrl: process.env.BASE_URL || 'https://www.guinness.diageo.site',
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  testUser: {
    dob: {
      dd: process.env.TEST_DOB_DD || '24',
      mm: process.env.TEST_DOB_MM || '05',
      yyyy: process.env.TEST_DOB_YYYY || '1996',
    },
  },
};

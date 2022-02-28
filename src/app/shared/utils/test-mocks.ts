import { of } from 'rxjs'

const heroServiceStub = () => {
  return () => ({
    getHeroes: jest.fn().mockImplementation(() =>of([{
      nameLabel: 'name',
      genderLabel: 'gender',
      citizenshipLabel: 'citizenship',
      skillsLabel: 'skills',
      occupationLabel: 'occupation',
      memberOfLabel: 'member',
      creatorLabel: 'creator'
    }])),
    filter: jest.fn(),
    removeFilter: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  })
}

const modalServiceStub = () => {
  return () => ({
    openDialog: jest.fn().mockReturnValue({
      afterClosed: jest.fn().mockImplementation(() => of({}))
    })
  })
}

const chartServiceStub = () => {
  return () => ({
    getChartData: jest.fn()
  })
}

const routerStub = () => {
  return () => ({
    navigate: jest.fn()
  })
}

const activatedRouteStub = () => {
  return () => ({
    navigate: jest.fn(),
    route: {
      snapshot: {
        queryParams: {
          'key': ''
        }
      }
    }
  })
}

const toastrServiceStub = () => {
  return () => ({
    error: jest.fn()
  })
}

const httpClientServiceStub = () => ({
    get: jest.fn(() => of({}))
})

export const generator = {
  heroServiceStub,
  modalServiceStub,
  routerStub,
  activatedRouteStub,
  chartServiceStub,
  httpClientServiceStub,
  toastrServiceStub
}

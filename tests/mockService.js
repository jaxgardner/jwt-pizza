import {  expect } from 'playwright-test-coverage';

export const mockMenuService = async (page) => {
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  };
  
  export const mockFranchiseService = async (page) => {
    await page.route('*/**/api/franchise', async (route) => {
      if(route.request().method() === 'GET') {
        const franchiseRes = [
          {
            id: 2,
            name: 'LotaPizza',
            stores: [
              { id: 4, name: 'Lehi' },
              { id: 5, name: 'Springville' },
              { id: 6, name: 'American Fork' },
            ],
          },
          { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
          { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
    } else {
      await route.continue()
    }
    });
  };

  export const mockAdminFranchises = async (page) => {
    await page.route('*/**/api/franchise', async (route) => {
      if(route.request().method() === 'GET') {
        const franchiseRes = [
          {
            id: 1,
            name: "Franchise 1",
            admins: [
              {
                id: 1,
                name: "Kai Chen",
                email: "d@jwt.com"
              }
            ],
            stores: []
          }
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
      } else if(route.request().method() === 'POST') {  
        const franchiseReq = { name: 'Franchise 1', stores: [], admins: [{email: "d@jwt.com"}] };
        const franchiseRes = {stores: [], name: 'Franchise 1', id: 1, admins: [{email: "a@jwt.com", id: 1, name: "Kai Chen"}]};
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(franchiseReq);
        await route.fulfill({ json: franchiseRes });
      } 
    });
  };

  
  
  export const mockAdminStores = async (page) => {
    await page.route('*/**/api/franchise/*', async (route) => {
      if(route.request().method() === 'GET') {
        const franchiseRes = [
          {
          id: 1,
          name: "Franchise 1",
          admins: [
            {
            id: 1,
            name: "Kai Chen",
            email: "d@jwt.com"
            }
          ],
          stores: []
          }
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
      } else if(route.request().method() === 'POST') {  
        const franchiseReq = { name: "Store 1" };
        const franchiseRes = { id: 1, name: "Store 1", franchiseId: 1 };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(franchiseReq);
        await route.fulfill({ json: franchiseRes });
      } 
    });
  };


  export const mockLoginService = async (page) => {
    await page.route('*/**/api/auth', async (route) => {
    if(route.request().method() === 'PUT') {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if(route.request().method() === 'DELETE') {
      const loginRes = { message: "logout successful" };
      expect(route.request().method()).toBe('DELETE');
      await route.fulfill({ json: loginRes });
    }
  });
}

export const mockRegisterService = async (page) => {
    await page.route('*/**/api/auth', async (route) => {
    const registerReq = { email: 'd@jwt.com', password: 'a', name: 'Kai Chen' };
    const registerRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });
}

export const mockAdminLoginService = async (page) => {
  await page.route('*/**/api/auth', async (route) => {
  const loginReq = { email: 'd@jwt.com', password: 'a' };
  const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
  expect(route.request().method()).toBe('PUT');
  expect(route.request().postDataJSON()).toMatchObject(loginReq);
  await route.fulfill({ json: loginRes });
});
}


export const mockCreateFranchiseService = async (page) => {
  await page.route('*/**/api/franchise', async (route) => {
    if(route.request().method() === 'POST') {  
      const franchiseReq = { name: 'Franchise 1', stores: [], admins: [{email: "d@jwt.com"}] };
      const franchiseRes = {stores: [], name: 'Franchise 1', id: 1, admins: [{email: "a@jwt.com", id: 1, name: "Kai Chen"}]};
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(franchiseReq);
      await route.fulfill({ json: franchiseRes });
    } 
});
}

export const mockGetOrderService = async (page) => {
  await page.route('*/**/api/order', async (route) => {
    const orderRes = {
      dinerId: 90,
      orders: [],
      page: 1
    };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: orderRes });
  });
}

export const mockOrderService = async (page) => {
    await page.route('*/**/api/order', async (route) => {
        const orderReq = {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
        };
        const orderRes = {
          order: {
            items: [
              { menuId: 1, description: 'Veggie', price: 0.0038 },
              { menuId: 2, description: 'Pepperoni', price: 0.0042 },
            ],
            storeId: '4',
            franchiseId: 2,
            id: 23,
          },
          jwt: 'eyJpYXQ',
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(orderReq);
        await route.fulfill({ json: orderRes });
      });
}
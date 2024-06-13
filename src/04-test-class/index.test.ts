// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1_000_000;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(10)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 1;
    const fromAccount = getBankAccount(balance);
    const toAccount = getBankAccount(balance);

    expect(() => fromAccount.transfer(10, toAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 1;
    const fromAccount = getBankAccount(balance);

    expect(() => fromAccount.transfer(10, fromAccount)).toThrowError();
  });

  test('should deposit money', () => {
    const balance = 1;
    const account = getBankAccount(balance);
    account.deposit(1);
    expect(account.getBalance()).toEqual(2);
  });

  test('should withdraw money', () => {
    const balance = 2;
    const account = getBankAccount(balance);
    account.withdraw(1);
    expect(account.getBalance()).toEqual(1);
  });

  test('should transfer money', () => {
    const balance = 1;
    const fromAccount = getBankAccount(balance);
    const toAccount = getBankAccount(balance);
    fromAccount.transfer(1, toAccount);

    expect(fromAccount.getBalance()).toEqual(0);
    expect(toAccount.getBalance()).toEqual(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = 1;
    const account = getBankAccount(balance);
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(account.fetchBalance());
    }
    (await Promise.all(results)).forEach((res) => {
      console.log(res);

      expect(res).not.toBeNull();
    });
    jest.spyOn(lodash, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 1;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(1000));
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(1000);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(2000));
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(2000);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(3000));
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(3000);
    jest.spyOn(account, 'fetchBalance').mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 1;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    jest.spyOn(account, 'fetchBalance').mockRestore();
  });
});

import type {Trade} from '../types';

const countrerparties = ['TCS', 'INFY', 'WIPRO', 'HCL', 'TECHM'];
const instruments = ['NIFTY', 'BANKNIFTY', 'RELIANCE', 'TCS', 'INFY'];
const statuses: Trade['settlementStatus'][] = ['PENDING', 'SETTLED', 'FAILED', 'REJECTED'];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const mockTrades: Trade[] = Array.from({length: 50}, (_, i) =>{
    const qty= 100+ Math.floor(Math.random() * 900)
    const price = 50+ Math.floor(Math.random() * 500)
    const tradeDate = new Date(Date.now() - Math.floor(Math.random() * 86400000));
    return {
        id: i + 1,
        tradeReference:`TRD-${1000 + i}`,
        counterparty: rand(countrerparties),
        instrument: rand(instruments),
        currency: 'INR',
        quantity: qty,
        price,
        amount: qty * price,
        status: 'EXECUTED',
        settlementStatus: rand(statuses),
        tradeDate: tradeDate.toISOString(),
        settlementDate: new Date(tradeDate.getTime() + 2 * 86400000).toISOString(),
    };
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    listTrades: async () => {
    await delay(400); // Simulate network delay
    return mockTrades;
},
};

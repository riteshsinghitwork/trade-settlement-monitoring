import type { Trade } from '../types/trade';
import { mockApi } from './mockData';

export const tradeServices = {
    list: (): Promise<Trade[]> => mockApi.listTrades(),
    }
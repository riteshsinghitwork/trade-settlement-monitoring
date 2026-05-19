export interface User {
    id: number;
    email: string;
    fullName: string;
    role: string;
}

export interface Trade {
    id: number;
    tradeReference: string;
    counterparty: string;
    instrument: string;
    currency: string;
    quantity: number;
    price: number;
    amount: number;
    status: 'PENDING' | 'EXECUTED' | 'SETTLED' | 'FAILED' | 'CANCELLED';
    settlementStatus: 'PENDING' | 'PROCESSING' | 'SETTLED' | 'FAILED' | 'REJECTED';
    tradeDate: string; // ISO date string
    settlementDate: string; // ISO date string
}
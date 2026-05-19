import { Spin } from "antd";
import { use, useEffect, useState } from "react";
import { tradeServices } from "../services/tradeServices";
import type { Trade } from "../types";


const STATUS_COLORS: Record<string, string> = {
    PENDING:'#faad14',
    PROCESSING:'#1890ff',
    SETTLED:'#52c41a',
    FAILED:'#ff4d4f',
    REJECTED:'#8c8c8c',
};

export default function Dashboard() {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tradeServices.list().then(data => {
            setTrades(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div style={{textAlign:'center', padding:80}}><Spin size="large" /></div> 
    }

    //kpi metrics
    const total = trades.length;
    const settled = trades.filter((t) => t.settlementStatus === 'SETTLED').length;
    const pending = trades.filter((t) => t.settlementStatus === 'PENDING'|| t.settlementStatus === 'PROCESSING').length;
    const failed = trades.filter((t) => t.settlementStatus === 'FAILED' || t.settlementStatus === 'REJECTED').length;
    const totalVolumes = trades.reduce((sum,t) => sum + t.quantity, 0);


    //Pie Chart
    const statusCounts = Object.keys(STATUS_COLORS).map(status => ({
        name: status,
        value: trades.filter(t => t.settlementStatus === status).length,
    })).filter((d) => d.value > 0);

    //Bar charts data
    const cpMap = new Map<string, number>();
    trades.forEach(t => {
        cpMap.set(t.counterparty, (cpMap.get(t.counterparty) || 0) + 1);
        const cpData = Array.from(cpMap,([name, count]) => ({name, count}));

        return (
            <div>
                <h2 style={{marginBottom:24}}>Dashboard</h2>
            </div>
        )
    });

}
    
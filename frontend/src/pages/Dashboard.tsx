import { Card, Col, Row, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";
import { DollarOutlined } from "@ant-design/icons";

import { tradeServices } from "../services/tradeServices";
import type { Trade } from "../types";

const STATUS_COLORS: Record<string, string> = {
    PENDING: '#faad14',
    PROCESSING: '#1890ff',
    SETTLED: '#52c41a',
    FAILED: '#ff4d4f',
    REJECTED: '#8c8c8c',
};

export default function Dashboard() {

    const [trades, setTrades] = useState<Trade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tradeServices.list().then((data) => {
            setTrades(data);
            setLoading(false);
        });
    }, []);

    // Loading screen
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 80 }}>
                <Spin size="large" />
            </div>
        );
    }

    // KPI Metrics
    const total = trades.length;

    const settled = trades.filter(
        (t) => t.settlementStatus === 'SETTLED'
    ).length;

    const pending = trades.filter(
        (t) =>
            t.settlementStatus === 'PENDING' ||
            t.settlementStatus === 'PROCESSING'
    ).length;

    const failed = trades.filter(
        (t) =>
            t.settlementStatus === 'FAILED' ||
            t.settlementStatus === 'REJECTED'
    ).length;

    const totalVolumes = trades.reduce(
        (sum, t) => sum + t.quantity,
        0
    );

    // Pie Chart Data
    const statusCounts = Object.keys(STATUS_COLORS)
        .map((status) => ({
            name: status,
            value: trades.filter(
                (t) => t.settlementStatus === status
            ).length,
        }))
        .filter((d) => d.value > 0);

    // Bar Chart Data
    const cpMap = new Map<string, number>();

    trades.forEach((t) => {
        cpMap.set(
            t.counterparty,
            (cpMap.get(t.counterparty) || 0) + 1
        );
    });

    const cpData = Array.from(
        cpMap,
        ([name, count]) => ({
            name,
            count,
        })
    );

    return (
        <div style={{ padding: 24 }}>

            <h2 style={{ marginBottom: 24 }}>
                Dashboard
            </h2>

            <Row gutter={[16, 16]}>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Trades"
                            value={total}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Settled Trades"
                            value={settled}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Pending Trades"
                            value={pending}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Failed Trades"
                            value={failed}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>

            </Row>

        </div>
    );
}
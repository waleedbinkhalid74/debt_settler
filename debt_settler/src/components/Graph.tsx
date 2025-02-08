import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";
import Transaction from "../Types";

interface GraphProps {
    users: string[]; // Users is an array of strings
    transactions: Transaction[];  // Transactions is an array of tuples
}

const Graph: React.FC<GraphProps> = ({ users, transactions }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const nodes = users.map((user, index) => ({
            id: index + 1,
            label: user, // Node label is set to the user's name
        }));

        const userIndexMap = users.reduce((acc, user, index) => {
            acc[user] = index + 1; // Store 1-based index
            return acc;
        }, {} as Record<string, number>);

        const edges = transactions.flatMap(([fromUser, amount, toUsers]) => {
            const from = userIndexMap[fromUser];

            // Create an edge for each toUser
            return toUsers.map((toUser) => {
                const to = userIndexMap[toUser];
                return {
                    from,
                    to,
                    label: amount.toFixed(2).toString(),
                    arrows: { from: true },
                };
            });
        });

        const network = new Network(containerRef.current, { nodes, edges }, {});

        return () => network.destroy();
    }, [users, transactions]); // Re-run effect when state changes

    return (
        <div>
            <div className="border border-info" ref={containerRef} style={{ height: 400 }} />
        </div>
    );
};

export default Graph;

import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";
import Transaction from "../Types";

interface GraphProps {
    users: string[]; // Users is an array of strings
    transactions: Transaction[];  // Transactions is an array of tuples
    immediateRender: boolean;  // Boolean to determine if the graph should be rendered immediately
}

interface Node {
    id: number;
    label: string;
}

const Graph: React.FC<GraphProps> = ({ users, transactions, immediateRender }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let nodes: Node[] = [];
        let invovledUsers: string[] = [];
        if (immediateRender || transactions.length > 0) {
            // if the trasactions are not empty then the users should only be the ones that are in the transactions
            if (transactions.length > 0) {
                invovledUsers = Array.from(new Set(transactions.flatMap(([fromUser, _, toUser]) => [fromUser, toUser])));
            }
            else {
                // shallow copy the users array
                invovledUsers = [...users];
            }
            nodes = invovledUsers.map((user, index) => ({
                id: index + 1,
                label: user, // Node label is set to the user's name
            }));
        }
        const userIndexMap = invovledUsers.reduce((acc, user, index) => {
            acc[user] = index + 1; // Store 1-based index
            return acc;
        }, {} as Record<string, number>);

        const edges = transactions.flatMap(([fromUser, amount, toUser]) => {
            const from = userIndexMap[fromUser];
            const to = userIndexMap[toUser];
            return {
                from,
                to,
                label: amount.toFixed(2).toString(),
                arrows: { from: true },
            };
        });

        const network = new Network(containerRef.current, { nodes, edges }, {});

        return () => network.destroy();
    }, [users, transactions]); // Re-run effect when state changes

    return (
        <div>
            <div className="bg-card w-100 rounded" ref={containerRef} style={{ height: 400 }} />
        </div>
    );
};

export default Graph;

import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";

interface GraphProps {
    users: string[]; // Users is an array of strings
}

const Graph: React.FC<GraphProps> = ({ users }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const nodes = users.map((user, index) => ({
            id: index + 1,
            label: user, // Node label is set to the user's name
        }));

        // const edges = [
        // { from: 1, to: 2, label: "50", arrows: { middle: true } },
        // { from: 2, to: 3, label: "25", arrows: { middle: true } },
        // { from: 3, to: 1, label: "25", arrows: { middle: true } },
        // ];

        const network = new Network(containerRef.current, { nodes }, {});

        return () => network.destroy();
    }, [users]); // Re-run effect when `users` state changes

    return (
        <div>
            <h3 className="text-center text-white">Graph</h3>
            <div className="border border-info" ref={containerRef} style={{ height: 400 }} />
        </div>
    );
};

export default Graph;

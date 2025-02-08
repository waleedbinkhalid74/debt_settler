import Transaction from "../Types";

const calculateFlow = (transactions: Transaction[], users: string[]): Record<string, number> => {
    let userFlowMap: Record<string, number> = users.reduce((acc, user) => {
        acc[user] = 0; // Initialize each user with value 0
        return acc;
    }, {} as Record<string, number>);

    for (let i = 0; i < transactions.length; i++) {
        let [fromUser, amount, toUsers] = transactions[i];
        for (let j = 0; j < toUsers.length; j++) {
            userFlowMap[fromUser] += amount;
            userFlowMap[toUsers[j]] -= amount;
        }
    }
    return userFlowMap;
};

export const runOptimization = (transactions: Transaction[], users: string[]): Transaction[] => {
    console.log("users ", users);
    // We have a complex graph with redundant transactions
    // A transaction is models as fromUser -- amount --> toUsers
    // meaning the fromUser should get money back from toUsers

    // Step 1: Calculate the total flow of each node
    let userFlowMap = calculateFlow(transactions, users);
    console.log("userFlowMap ", userFlowMap);

    // Step 2: Remove nodes with zero flow
    userFlowMap = Object.keys(userFlowMap).reduce((acc, key) => {
        if (userFlowMap[key] !== 0) {
            acc[key] = userFlowMap[key]; // Keep the key-value pair if value is not 0
        }
        return acc;
    }, {} as Record<string, number>);

    // Step 3: Divide the nodes in two lists, one for receiving and one for giving
    let receivingUsers = Object.entries(userFlowMap)
        .filter(([_, value]) => value > 0) // Filter pairs where value is greater than 0
        .map(([key, value]) => ({ key, value })); // Convert back to an array of objects with both key and value

    let givingUsers = Object.entries(userFlowMap)
        .filter(([_, value]) => value < 0) // Filter pairs where value is greater than 0
        .map(([key, value]) => ({ key, value })); // Convert back to an array of objects with both key and value

    // Step 4: Sort the lists in descending order
    receivingUsers.sort((a, b) => b.value - a.value);
    givingUsers.sort((a, b) => a.value - b.value);

    // Step 5: Match the users from the two lists following their order
    let simplifiedTransactions: Transaction[] = [];
    while (receivingUsers.length > 0 && givingUsers.length > 0) {
        let receivingUser = receivingUsers[0];
        let givingUser = givingUsers[0];
        let amount = Math.min(-givingUser.value, receivingUser.value);
        simplifiedTransactions.push([givingUser.key, amount, [receivingUser.key]]);
        givingUser.value += amount;
        receivingUser.value -= amount;
        receivingUsers = receivingUsers.filter(user => user.value !== 0);
        givingUsers = givingUsers.filter(user => user.value !== 0);
    }
    console.log("simplifiedTransactions ", simplifiedTransactions);
    return simplifiedTransactions;
};

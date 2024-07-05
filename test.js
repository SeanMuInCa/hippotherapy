function groupTransactions(transactions) {
  // Write your code here
  const tempMap = {};
  transactions.forEach((item) => {
    tempMap[item] = (tempMap[item] || 0) + 1;
  });

  const res = Object.keys(tempMap).map((key) => ({
    item: key,
    count: tempMap[key],
  }));
  res.sort((a, b) => b.count - a.count);
  return res.map((item) => `${item.item} ${item.count}`);
  //
  // WARNING: Please do not use GitHub Copilot, ChatGPT, or other AI assistants
  //          when solving this problem!
  //
  // We use these tools in our coding too, but in our interviews, we also don't
  // allow using these, and want to see how we do without them.
  //
}

console.log(groupTransactions(["bin", "can", "bin"]));

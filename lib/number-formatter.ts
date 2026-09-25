

export const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)} Billion`;
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)} Million`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }

  return num.toString();
};



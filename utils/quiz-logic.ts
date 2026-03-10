export const QuizUtils = {
  // 1. Manages UI state when a user clicks multiple answers
  toggleSelection: (currentVal: string, option: string): string => {
    let selected = currentVal ? currentVal.split(",") : [];
    if (selected.includes(option)) {
      selected = selected.filter((o) => o !== option);
    } else {
      selected.push(option);
    }
    return selected.join(",");
  },

  // 2. Helps clean up text inputs if you use them
  formatAnswer: (val: string) => val.trim().toLowerCase(),

  // 3. Calculates the dropdown options for the Customize Test screen
  getValidCounts: (totalAvailable: number) => {
    // Matches your exact rule: 10, 20, 40, or Total
    const standards = [10, 20, 40];
    const valid = standards.filter((s) => s < totalAvailable);
    return [...valid, totalAvailable];
  },
};

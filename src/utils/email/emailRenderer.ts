
// Email template rendering function
export const renderTemplate = (template: string, data: Record<string, any>): string => {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    }
  );
};

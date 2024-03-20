export const formatDate = (inputDate: string) =>
  new Date(inputDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

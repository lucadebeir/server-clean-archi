//encoder et décoder
export const encoder = (text: any) => {
  let res = encodeURI(text);
  return encodeURIComponent(res);
};

export const decoder = (text: any) => {
  let res = decodeURIComponent(text);
  return decodeURI(res);
};

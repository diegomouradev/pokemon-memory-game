const getAndSetUserInfo = (nameSpace, data) => {
  if (data) {
    return window.localStorage.setItem(nameSpace, JSON.stringify(data));
  }

  let store = window.localStorage.getItem(nameSpace);
  return (store && JSON.parse(store)) || [{}];
};

export default getAndSetUserInfo;

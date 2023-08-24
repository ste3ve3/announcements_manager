export const formatJoiErorr = error => {
    if (!error) {
      return null;
    }
    const message = error.replace(/"/g, '').replace(/Id/g, '');
    return message.charAt(0).toUpperCase() + message.slice(1);
  };